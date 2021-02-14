module.exports = {
  info: 'Информация о командах',
  run: (msg, args, bot) => {
    str = 'D4b0t - бот, построенный на D.js\n**Список команд**\n'
    for(cat in bot.commands) {
      str += cat + ':\n'
      for(cmdName in bot.commands[cat]) {
        cmd = bot.commands[cat][cmdName]
        str += '  ' + cmdName + (bot.loadedCommands[cmdName] ? '' : ' [ВЫКЛ]') +
          ': ' + (cmd.info ? cmd.info : 'Описания нету') + '\n'
      }
    }
    res = msg.author.send(str)
    if(msg.guild) {
      res.then(() => msg.reply('Вам отправлено сообщение в ЛС'))
      res.catch(() => msg.reply('Не смог отправить сообщение в ЛС.'))
    }
  }
}