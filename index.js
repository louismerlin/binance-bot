const Binance = require('binance')
const Telegraf = require('telegraf')

const secrets = require('./secrets')

const binance = new Binance.BinanceRest({
  key: secrets.binanceKey,
  secret: secrets.binanceSecret,
  handleDrift: true
})
const binanceWS = new Binance.BinanceWS(true)

const bot = new Telegraf(secrets.bot)

// On command `/start`
bot.start((ctx) => {
  console.log('Use this as the "you" field in secrets.json :')
  console.log(ctx.update.message.from.id)
  ctx.reply('👋')
})

// On command `/balance`
bot.command('/balance', (ctx) => {
  binance.account().then((data) => {
    ctx.reply(
      data.balances.map(x => {
        const value = parseFloat(x.free) + parseFloat(x.locked)
        if (value) return `<b>${x.asset}</b> : <code>${value}</code>`
        else return undefined
      }).filter(x => x).join(`\n`), {parse_mode: 'HTML'}
    )
  }).catch(x => {
    console.log(x)
    bot.telegram.sendMessage(secrets.you, JSON.stringify(x))
  })
})

// On every event that happens with your binance account
binanceWS.onUserData(binance, (data) => {
  if (data.eventType === "executionReport") {
    console.log(data)
    bot.telegram.sendMessage(
      secrets.you,
      `<i>${data.orderStatus}</i> <b>${data.symbol}</b> ${data.side}@${parseFloat(data.price)} : <code>${parseFloat(data.accumulatedQuantity)}/${parseFloat(data.quantity)}</code>`,
      {parse_mode: 'HTML'}
    )
  } else {
    // Uncomment the following line if you want the raw JSON data for events that are not execution reports
    //bot.telegram.sendMessage(secrets.you, JSON.stringify(data))
  }
}).catch(x => {
  console.log(x)
  bot.telegram.sendMessage(secrets.you, JSON.stringify(x))
})

// Start the bot !
bot.startPolling()
