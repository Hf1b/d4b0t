const sharp = require('sharp')
const fetch = require('node-fetch')

const compose = async (msg, bot, file) => {
  let url = await bot.utils.findImage(msg, bot)
  if(!url) {
    msg.reply('Изображение не найдено')
    return
  }

  let buff
  try {
    buff = await bot.utils.download(url)
  } catch(e) {
    msg.reply(e.message)
    return
  }

  let image = sharp(buff)
  let meta = await image.metadata()

  let res = sharp(require.main.path + '/assets/' + file + '.png')
    .resize(meta.width, meta.height, {
      fit: 'fill'
    })

  buff = await image.composite([{ input: await res.png().toBuffer(), blend: 'darken' }]).png().toBuffer()
  msg.reply({ files: [ { attachment: buff, name: file + '.png' } ] })
}

const theapi = async (msg, url) => {
  let res = await fetch(url)
  res = await res.json()
  msg.reply({ files: [ res[0].url ] })
}

module.exports = {
  compose, theapi
}
