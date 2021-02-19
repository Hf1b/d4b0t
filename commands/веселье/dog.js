module.exports = {
  info: 'Показ собак',
  run: async (msg, bot) => {
    await bot.templates.theapi(msg,
      'https://api.thedogapi.com/v1/images/search')
  }
}
