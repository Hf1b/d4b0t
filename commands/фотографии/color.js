const sharp = require('sharp')

module.exports = {
  info: 'Диапозон смешивания от 0 до 255. Показывает цвет',
  usage: '<red> <green> <blue>',
  run: async (msg, bot) => {
    if(msg.args.length < 3) {
      msg.reply('Укажите соотношение цветов в диапозоне от 0 до 255.')
      return
    }
    let r = parseInt(msg.args[0])
    let g = parseInt(msg.args[1])
    let b = parseInt(msg.args[2])
    let all = [r, g, b]

    if(all.includes(NaN) || Math.min(...all) < 0 || Math.max(...all) > 255) {
      msg.reply('Ошибка при считывании одного или нескольких чисел.')
      return
    }

    let img = sharp({ create: {
      width: 75,
      height: 75,
      channels: 3,
      background: { r, g, b }
    } }).png()

    msg.reply({ files: [ { attachment: await img.toBuffer(), name: 'color.png' } ] })
  }
}
