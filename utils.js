declOfNum = (number, titles) => {
  // https://gist.github.com/realmyst/1262561
  cases = [2, 0, 1, 1, 1, 2]
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
}

declOfNum.days = ['день', 'дня', 'дней'],
declOfNum.hours = ['час', 'часа', 'часов'],
declOfNum.minutes = ['минута', 'минуты', 'минут']
declOfNum.seconds = ['секунда', 'секунды', 'секунд']

module.exports = {
  declOfNum
}