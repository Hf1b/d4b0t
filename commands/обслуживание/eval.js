module.exports = {
  info: 'Выполнение кода',
  level: 'BOT_OWNER',
  run: (msg, args, bot) => {
    const date = new Date()
    err = false
    try {
      res = eval(args.join(' '))
    } catch(e) {
      err = true
      res = e.toString()
    }
    const elapsed = (new Date() - date) / 1000
    msg.reply((err ? ':negative_squared_cross_mark: ' : ':white_check_mark:') +
      ' Выполнено за ' + elapsed + 'с.\n```\n' + res + '\n```')
  }
}