module.exports = {
  info: 'Показ котов',
  run: async (msg, bot) => {
    await bot.templates.theapi(msg,
      'https://api.thecatapi.com/v1/images/search')
  }
}
