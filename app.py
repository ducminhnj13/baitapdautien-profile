import os
import requests
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '8799037733:AAEqoxtgk9Nup2k7KVhs2l648FG4yN6qs90')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID', '1658426402')

TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json(silent=True)
    if not data:
        return 'Dữ liệu không hợp lệ', 400

    sender = data.get('sender', '').strip()
    content = data.get('content', '').strip()
    if not sender or not content:
        return 'Tên và nội dung là bắt buộc', 400

    text = f'📨 Tin nhắn mới từ {sender}:\n{content}'
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': text,
        'parse_mode': 'HTML'
    }

    response = requests.post(TELEGRAM_API_URL, data=payload)
    if not response.ok:
        return response.text, response.status_code

    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
