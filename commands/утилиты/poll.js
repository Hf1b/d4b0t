module.exports = {
  info: 'Создание голосования',
  usage: '<запрос> <вариант 1> [[вариант 2] ... [вариант n]]',
  run: async (msg, bot) => {
    if(msg.args.length < 2) {
      msg.reply('Посмотрите правильное написание команды в команде help.')
      return
    }

    const query = msg.args.shift()

    if(msg.args.length > bot.utils.pollEmojis.length) {
      msg.reply('Вариантов в голосовании более ' +
        bot.utils.pollEmojis.length + ' (' + msg.args.length + ')')
      return
    }

    list = msg.args.length == 2 ? bot.utils.yesnoEmojis : bot.utils.pollEmojis

    let out = 'Автор: ' + msg.author.tag + ' | ' + msg.author.id +
      '\n' + query

    for(let sugg in msg.args) {
      out += '\n' + list[sugg] + ': ' + msg.args[sugg]
    }

    if(out.length > 2000) {
      msg.reply('Выходит больше 2000 символов (' + out.length + ').')
      return
    }

    m = await msg.channel.send(out)
    for(let e = 0; e < msg.args.length; e++) {
      await m.react(list[e])
    }
  }
}
