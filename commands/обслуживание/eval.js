module.exports = {
  info: 'Выполнение кода',
  level: 'BOT_OWNER',
  run: (msg, bot) => {
    const date = new Date()
    let err, res
    try {
      res = eval(msg.args.join(' '))
    } catch(e) {
      err = true
      res = e.toString()
    }
    const elapsed = (new Date() - date) / 1000
    msg.reply((err ? ':negative_squared_cross_mark: ' : ':white_check_mark:') +
      ' Выполнено за ' + elapsed + 'с.\n```\n' + res + '\n```')
  }
}
