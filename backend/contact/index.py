import json
import os
import psycopg2

SCHEMA = 't_p96355905_luti_premium_store'

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """Guarda un mensaje de contacto en la base de datos."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Nombre, email y mensaje son requeridos'}),
        }

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {SCHEMA}.contact_messages (name, company, email, service_type, message) VALUES (%s, %s, %s, %s, %s)",
        (name, body.get('company', ''), email, body.get('service_type', ''), message)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 201,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'message': 'Mensaje recibido. Te contactaremos pronto.'}),
    }
