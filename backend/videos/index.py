import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all videos from database or create new video
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with request_id
    Returns: HTTP response with videos list or created video
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute(
            "SELECT id, character_type, child_name, video_url, thumbnail_url, views_count, created_at FROM videos ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        
        videos = []
        for row in rows:
            videos.append({
                'id': row[0],
                'character': row[1],
                'name': row[2],
                'videoUrl': row[3],
                'thumbnail': row[4],
                'views': row[5],
                'createdAt': row[6].isoformat() if row[6] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'videos': videos})
        }
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        character_type = body_data.get('character', '')
        child_name = body_data.get('name', '')
        video_url = body_data.get('videoUrl', 'https://www.w3schools.com/html/mov_bbb.mp4')
        thumbnail_url = body_data.get('thumbnail', '/placeholder.svg')
        
        if not character_type or not child_name:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Character and name required'})
            }
        
        cur.execute(
            "INSERT INTO videos (character_type, child_name, video_url, thumbnail_url) VALUES ('" + 
            character_type.replace("'", "''") + "', '" + 
            child_name.replace("'", "''") + "', '" + 
            video_url.replace("'", "''") + "', '" + 
            thumbnail_url.replace("'", "''") + 
            "') RETURNING id, character_type, child_name, video_url, thumbnail_url, views_count, created_at"
        )
        row = cur.fetchone()
        conn.commit()
        
        new_video = {
            'id': row[0],
            'character': row[1],
            'name': row[2],
            'videoUrl': row[3],
            'thumbnail': row[4],
            'views': row[5],
            'createdAt': row[6].isoformat() if row[6] else None
        }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'video': new_video})
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
