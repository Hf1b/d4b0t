module.exports = {
  info: 'Тест аргументов',
  level: 'BOT_OWNER',
  run: (msg, args, bot) => {
    out = 'Аргументы:\n'
    for(i in args) {
      out += `${i}: ${args[i]}\n`
    }
    msg.reply(out)
  }
}