module.exports = {
  info: 'Статус бота',
  run: async (msg, bot) => {
    let declOfNum = bot.utils.declOfNum

    let elapsed = Date.now() - bot.loadStamp
    let s = Math.floor((elapsed / 1000) % 60)
    let m = Math.floor((elapsed / (1000 * 60)) % 60)
    let h = Math.floor((elapsed / (1000 * 60 * 60)) % 24)
    let d = Math.floor((elapsed / (1000 * 60 * 60 * 24)))

    msg.reply('API Пинг: ' + bot.ws.ping + 'мс\n' +
      'Бот работает: ' + (d ? d + ' ' + declOfNum(d, declOfNum.days) + ' ' : '') +
        (h ? h + ' ' + declOfNum(h, declOfNum.hours) + ' ' : '') + 
        (m ? m + ' ' + declOfNum(m, declOfNum.minutes) + ' ' : '') +
        s + ' ' + declOfNum(s, declOfNum.seconds)
    )
  }
}
