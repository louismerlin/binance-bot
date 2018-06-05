# binance-bot
A very simple binance telegram bot

## Motivation
I created this telegram bot to keep me informed of the status of my orders on Binance.

## Usage
This bot will send you a message for every order started, canceled & filled.

To see your balance, type `/balance`.

## How do I get this ?

### 1 - Create a telegram bot
Go and have a chat with [@BotFather](https://t.me/BotFather). Tell him `/newbot`, and follow the instructions.

BotFather will give you a token to control the bot, something like `123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ`.

### 2 - Get this code & add the token
Use the following command to get the code for this bot :
```
git clone https://github.com/louismerlin/binance-bot
```
Then create a secrets file to keep all your tokens (this file will not be seen by git) :
```
cd binance-bot
echo {\"binanceKey\": \"\", \"binanceSecret\": \"\", \"bot\": \"YOUR_TELEGRAM_BOT_TOKEN\", \"you\": 0} > secrets.json
```
Don't forget to replace `YOUR_TELEGRAM_BOT_TOKEN` by... your telegram bot token.

### 3 - Get your telegram ID
Now it's time to run your bot for the first time !

First install the dependencies, with either `npm install` or `yarn install` depending on what you use.

When this is done you can go ahead and `node index.js`. Don't be alarmed when it throws out some errors in your face, it's nothing serious.

What you need to do now is go to telegram and have a chat with your bot, using his handle (@mybot, the one that finishes with 'bot'). BotFather should have given you a link to him, too.

When you initiate the conversation, it sends the `/start` command to the bot, which triggers some more errors in your terminal, but more importantly, gives you **your** telegram id (of the form `12345678`).

Copy this telegram ID into the `secrets.json` file, in the "you" field.

### 4 - Get your binance API keys
You can now (finaly) head over to [binance](https://binance.com). First make sure I did not trick you into a phishing attempt, and then log in.

When you're in, you should see on the main dashboard a *API Settings* button. Click on that.

Enter a label for your new API key, for example `telegram`, and click on *Create New Key*.

This bot only requires **Read Info**.

Once you have your key & secret, put those values into the `secrets.json` file.

### You're done !
Good job, now you can run your bot with `node index.js`. If you would like it to continuously run, get yourself a small server somewhere and run `node index.js &` in the directory (don't forget to copy your secrets & install the dependencies). If you want to stop it down the line use `killall node` (if you have no other node processes running, otherwise `kill PID`, with PID being the processe's pid).
