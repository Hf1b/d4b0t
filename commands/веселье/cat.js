const fetch = require('node-fetch')

module.exports = {
  info: 'Показ котов',
  run: async (msg, args, bot) => {
    res = await fetch('https://api.thecatapi.com/v1/images/search')
    res = await res.json()
    msg.reply({ files: [ res[0].url ] })
  }
}