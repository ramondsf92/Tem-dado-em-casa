const telegramBot = require('node-telegram-bot-api')
const token = '1209880298:AAH4vjQ--DbWx4YThSdsg6QZADlq4l2SsMk'
const bot = new telegramBot(token, {polling: true})

bot.onText(/\/roll (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const roll = match[1]
    const pos = roll.indexOf('d')
    const qtd = roll.slice(0, pos)
    const face = roll.indexOf('+') === -1 ? roll.slice(pos+1) : roll.slice(pos+1, roll.indexOf('+'))
    const mod = roll.indexOf('+') === -1 ? 0 : roll.slice(roll.indexOf('+')+1)
    const rolagens = []

    for(let i = 0; i < qtd; i++) {
        rolagens.push(Math.ceil(Math.random() * face))
    }

    const result = rolagens.reduce((acc, valor) => valor + acc, 0)
    const resultFinal = result + parseInt(mod)

    bot.sendMessage(chatId, 'Rolagens: ' + rolagens + 
        '\nResultado: ' + result + '+' + mod + '=' + resultFinal)

})