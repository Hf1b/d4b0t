const fetch = require('node-fetch')
const AbortController = require('abort-controller')

const Regex = {
  url: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/im,
  snowflake: /\d{16,20}/
}

const LIMIT_5MB = 5 * 1024 * 1024

const declOfNum = (number, titles) => {
  // https://gist.github.com/realmyst/1262561
  cases = [2, 0, 1, 1, 1, 2]
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
}

declOfNum.days = ['день', 'дня', 'дней'],
declOfNum.hours = ['час', 'часа', 'часов'],
declOfNum.minutes = ['минуту', 'минуты', 'минут']
declOfNum.seconds = ['секунду', 'секунды', 'секунд']

const download = async (url) => {
  try {
    let file = await fetch(url, { size: LIMIT_5MB })
    let buffer = await file.buffer()

    return buffer
  } catch(e) {
    if(e.name == 'FetchError')
      throw Error('Объект слишком большой для скачивания')
    else throw Error('Непредвиденная ошибка при скачивании объекта')
  }
}

const findImage = async (msg, bot) => {
  // User mention
  let musers = msg.mentions.users
  if(musers > 0 && musers.first().avatarURL) {
    return musers.avatarURL({ format: 'png' })
  }
  // Attachment
  if(msg.attachments.size > 0) {
    return msg.attachments.first().url
  }

  // ID, Url
  let aid, url
  url = msg.content.match(Regex.url)
  if(url) {
    url = url[0]
  }
  if(!url) {
    aid = msg.content.match(Regex.snowflake)
    if(aid) {
      aid = aid[0]
    }
  }

  if(url) return url

  if(aid) {
    try {
      // User avatar
      let user = await bot.users.fetch(aid)
      if(user && user.avatarURL) return user.avatarURL({ format: 'png' })
    } catch(e) {
      // Guild emoji
      if(msg.guild) {
        let emoji = msg.guild.emojis.resolve(aid)
        if(emoji) return emoji.url
      }
    }
  }
}

module.exports = {
  declOfNum, download, findImage
}
