import json
import os
import psycopg2

SCHEMA = 't_p96355905_luti_premium_store'


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """GET: lista pedidos con cliente y stats. POST: crea nuevo pedido desde el carrito."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"""
            SELECT o.id, o.order_ref, c.name AS client, o.status, o.total, o.created_at,
                   string_agg(oi.product_name || ' x' || oi.quantity, ', ') AS items
            FROM {SCHEMA}.orders o
            LEFT JOIN {SCHEMA}.clients c ON o.client_id = c.id
            LEFT JOIN {SCHEMA}.order_items oi ON oi.order_id = o.id
            GROUP BY o.id, o.order_ref, c.name, o.status, o.total, o.created_at
            ORDER BY o.created_at DESC
        """)
        rows = cur.fetchall()

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.orders")
        total_orders = cur.fetchone()[0]

        cur.execute(f"SELECT COALESCE(SUM(total), 0) FROM {SCHEMA}.orders WHERE created_at >= date_trunc('month', NOW())")
        month_total = cur.fetchone()[0]

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.orders WHERE status IN ('En proceso', 'Pendiente')")
        in_progress = cur.fetchone()[0]

        cur.close()
        conn.close()

        orders = [
            {
                'id': r[1],
                'client': r[2] or 'Sin cliente',
                'product': r[6] or '',
                'status': r[3],
                'date': r[5].strftime('%d %b') if r[5] else '',
                'total': f"${r[4]:,}".replace(',', '.'),
            }
            for r in rows
        ]

        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'orders': orders,
                'stats': {
                    'total_orders': total_orders,
                    'month_total': month_total,
                    'in_progress': in_progress,
                },
            }),
        }

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        client_name = body.get('client_name', 'Cliente')
        client_email = body.get('client_email', '')
        items = body.get('items', [])

        if not items:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'No items'})}

        total = sum(i['price'] * i.get('quantity', 1) for i in items)

        conn = get_conn()
        cur = conn.cursor()

        safe_email = client_email if client_email else f'guest_{client_name.replace(" ", "_").lower()}@luti.co'
        cur.execute(
            f"INSERT INTO {SCHEMA}.clients (name, email) VALUES (%s, %s) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name RETURNING id",
            (client_name, safe_email)
        )
        client_id = cur.fetchone()[0]

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.orders")
        count = cur.fetchone()[0]
        order_ref = f'#LT-{2400 + count + 1}'

        cur.execute(
            f"INSERT INTO {SCHEMA}.orders (order_ref, client_id, status, total) VALUES (%s, %s, %s, %s) RETURNING id",
            (order_ref, client_id, 'Pendiente', total)
        )
        order_id = cur.fetchone()[0]

        for item in items:
            cur.execute(
                f"INSERT INTO {SCHEMA}.order_items (order_id, product_id, product_name, quantity, unit_price) VALUES (%s, %s, %s, %s, %s)",
                (order_id, item.get('id'), item['name'], item.get('quantity', 1), item['price'])
            )

        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 201,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'order_ref': order_ref, 'total': total}),
        }

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
