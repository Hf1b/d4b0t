const prefix = '*'
const owners = ['485756276782006272']

if(!process.env.BOT_TOKEN) {
  console.error('Укажите токен в BOT_TOKEN перед запуском.')
  process.exit(1)
}

const date = new Date()

const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const bot = new Discord.Client()
bot.utils = require('./utils')
bot.templates = require('./templates')

const commandsDir = path.join(__dirname, 'commands')
bot.loadedCommands = {}
bot.commands = {}
bot.commandCache = () => {
  for(let cat in bot.commands) {
    for(let cmd in bot.commands[cat]) {
      bot.loadedCommands[cmd] = bot.commands[cat][cmd]
    }
  }
}

const flags = Object.keys(Discord.Permissions.FLAGS)
bot.checkLevel = (level, user) => {
  if(owners.includes(user.id)) return true
  if(user && user.hasPermission && flags.includes(level)) {
    return user.hasPermission(level)
  }
  return false
}

for(let cat of fs.readdirSync(commandsDir)) {
  const categoryDir = path.join(commandsDir, cat)
  cat = cat[0].toUpperCase() + cat.slice(1)
  bot.commands[cat] = {}
  for(let cmd of fs.readdirSync(categoryDir)) {
    if(!cmd.endsWith('.js') || cmd.endsWith('.js.')) {
      console.log('Команда ' + cmd + ' пропущена')
      return
    }
    cmd = cmd.split('.js')[0]
    bot.commands[cat][cmd] = require(path.join(categoryDir, cmd))
  }
}

bot.once('ready', () => {
  bot.loadStamp = Date.now()
  bot.commandCache()
  console.log('Загружено команд: ' + Object.keys(bot.loadedCommands).length)
  console.log(`Бот грузился ${(new Date() - date) / 1000}с. ${bot.user.tag} (${bot.user.id})`)
  bot.user.setActivity(prefix + 'help')
})

bot.on('message', async msg => {
  if(msg.author.bot) return
  if(!msg.content.startsWith(prefix)) return
  const content = msg.content.slice(prefix.length)
  msg.args = content.match(/".+?"|'.+?'|[^\s]+/g).map(i => {
    if(i[0] == i[i.length-1] && (i[0] == '"' || i[0] == "'")) {
      return i.slice(1, i.length-1)
    }
    return i
  })
  let cmd = msg.args.shift()

  if(bot.loadedCommands[cmd] && bot.loadedCommands[cmd].run) {
    let current = bot.loadedCommands[cmd]
    if(current.level) {
      if(!bot.checkLevel(current.level, msg.member ? msg.member : msg.author)) {
        msg.reply('Вы должны иметь право ' + current.level + ' для запуска команды.')
        return
      }
    }

    current.run(msg, bot)
  }
})

bot.login(process.env.BOT_TOKEN)

process.on('uncaughtException', console.error)
