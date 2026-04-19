import os
import requests

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '8799037733:AAEqoxtgk9Nup2k7KVhs2l648FG4yN6qs90')

url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates'
response = requests.get(url)
print('Request URL:', url)
print('Status code:', response.status_code)
print('Response:')
print(response.text)

if response.ok:
    data = response.json()
    if data.get('result'):
        print('\nDetected chat IDs:')
        for update in data['result']:
            chat = update.get('message', {}).get('chat') or update.get('my_chat_member', {}).get('chat')
            if chat:
                print('- chat_id:', chat.get('id'), 'title:', chat.get('title') or chat.get('username') or chat.get('first_name'))
    else:
        print('\nNo updates found. Send a message to the bot first, then run this script again.')
else:
    print('Failed to fetch updates. Check the bot token or network.')