# Digital Profile Website

A modern digital profile website for NEMI with personal information, social links, and a fireworks gift button.

## Features
- Personal information: Name, position at NEMI, profile picture
- Social links: Facebook, Zalo, LinkedIn
- Modern, beautiful interface
- Gift button with fireworks animation

## Usage
1. Open `index.html` in a web browser.
2. View the profile information.
3. Click the social links to navigate (update URLs as needed).
4. Click the "Tặng quà" button to trigger fireworks.

## Customization
- Update name, position, and image in `index.html`.
- Replace placeholder links with actual URLs.
- Modify styles in `styles.css` for design changes.
- Adjust fireworks in `script.js`.

## Running the Telegram backend
1. Install the Python dependencies:
   `python -m pip install -r requirements.txt`
2. Start the Flask server:
   `python app.py`
3. Open `http://localhost:8000` in your browser.

## Finding the correct Telegram chat_id
1. Open Telegram and send a message to your bot (`dukmink13_bot`).
2. Run:
   `python get_chat_id.py`
3. Copy the `chat_id` shown in the output.
4. Update `TELEGRAM_CHAT_ID` in `app.py` or set the environment variable:
   `set TELEGRAM_CHAT_ID=<chat_id>` on Windows.

## Troubleshooting
- If `get_chat_id.py` shows no updates, make sure you have sent a message to the bot.
- If `send_message` still fails, the error will be shown in a browser alert.
- Do not expose your bot token publicly.
- For mobile, the design is responsive.