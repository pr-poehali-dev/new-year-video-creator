import json
import os
import base64
from typing import Dict, Any
from openai import OpenAI
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Генерирует персонализированное видео-поздравление с голосом
    Args: event с httpMethod, body (character, name, message)
    Returns: HTTP response с URL созданного видео
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    character = body_data.get('character', 'santa')
    child_name = body_data.get('name', '')
    custom_message = body_data.get('message', '')
    
    if not child_name:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Name is required'})
        }
    
    character_names = {
        'santa': 'Дед Мороз',
        'snowmaiden': 'Снегурочка',
        'snowman': 'Снеговик'
    }
    
    character_name = character_names.get(character, 'Дед Мороз')
    
    greeting_text = custom_message if custom_message else f"Здравствуй, {child_name}! Я {character_name}! Поздравляю тебя с Новым Годом! Желаю тебе в новом году быть здоровым, счастливым и послушным! Пусть сбудутся все твои мечты! С Новым Годом!"
    
    openai_key = os.environ.get('OPENAI_API_KEY')
    if not openai_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'OpenAI API key not configured'})
        }
    
    client = OpenAI(api_key=openai_key)
    
    voice_map = {
        'santa': 'onyx',
        'snowmaiden': 'nova',
        'snowman': 'fable'
    }
    
    voice = voice_map.get(character, 'onyx')
    
    response = client.audio.speech.create(
        model="tts-1",
        voice=voice,
        input=greeting_text
    )
    
    audio_base64 = base64.b64encode(response.content).decode('utf-8')
    audio_url = f"data:audio/mp3;base64,{audio_base64}"
    
    thumbnails = {
        'santa': '/img/d48aa981-3b64-42ad-a810-bb7c0d926bdd.jpg',
        'snowmaiden': '/img/e7db9042-a0ba-48c2-bb1b-201b2767e23a.jpg',
        'snowman': '/img/18f25e6e-f42e-4f85-a43a-74c133aa24e8.jpg'
    }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO videos (character, name, video_url, thumbnail, greeting_text) VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (character, child_name, audio_url, thumbnails.get(character, thumbnails['santa']), greeting_text)
    )
    
    video_id = cur.fetchone()[0]
    conn.commit()
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'video_id': video_id,
            'audio_url': audio_url,
            'greeting_text': greeting_text
        })
    }
