// Just for compitability check
const sharp = require('sharp')

module.exports = {
  info: '"американский акцент" в изображении',
  cooldown: 2,
  run: async (msg, bot) => {
    await bot.templates.compose(msg, bot, 'usa')
  }
}
