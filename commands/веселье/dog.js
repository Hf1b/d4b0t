const fetch = require('node-fetch')

module.exports = {
  info: 'Показ собак',
  run: async (msg, args, bot) => {
    let res = await fetch('https://api.thedogapi.com/v1/images/search')
    res = await res.json()
    msg.reply({ files: [ res[0].url ] })
  }
}