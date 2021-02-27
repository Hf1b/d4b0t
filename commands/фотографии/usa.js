// Just for compitability check
const sharp = require('sharp')

module.exports = {
  info: '"американский акцент" в изображении',
  run: async (msg, bot) => {
    await bot.templates.compose(msg, bot, 'usa')
  }
}
