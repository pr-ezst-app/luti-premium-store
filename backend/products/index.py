import json
import os
import psycopg2

SCHEMA = 't_p96355905_luti_premium_store'

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """Devuelve lista de productos activos con su categoría."""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"""
        SELECT p.id, p.name, c.name AS category, p.price, p.tag, p.img_url, p.description, p.stock
        FROM {SCHEMA}.products p
        LEFT JOIN {SCHEMA}.categories c ON p.category_id = c.id
        WHERE p.active = TRUE
        ORDER BY p.id
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    products = [
        {
            'id': r[0],
            'name': r[1],
            'category': r[2] or '',
            'price': r[3],
            'tag': r[4] or '',
            'img': r[5] or '',
            'description': r[6] or '',
            'stock': r[7] or 0,
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'products': products}),
    }
