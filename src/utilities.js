import axios from 'axios'

const convert = (start, endUnit, round) => {
  const temp =
    endUnit && endUnit.toLocaleLowerCase() === 'm'
      ? start - 273.15
      : (start - 273.15) * 1.8 + 32
  return (
    Math.round(temp).toString() +
    (endUnit && endUnit.toLocaleLowerCase() === 'm' ? ' ˚C' : ' ˚F')
  )
}

const toTimeString = date =>
  `${
    new Date(date * 1000).getHours() === 0
      ? 12
      : new Date(date * 1000).getHours() > 12
      ? new Date(date * 1000).getHours() - 12
      : new Date(date * 1000).getHours()
  }:${('0' + new Date(date * 1000).getMinutes()).slice(-2)} ${
    new Date(date * 1000).getHours() >= 12 ? 'PM' : 'AM'
  }`

const round = (num, amount) =>
  Math.round(Number(num) * 10 ** (amount || 0)) / 10 ** (amount || 0)

const fetchWeather = async (callback, zip) => {
  axios
    .get(zip ? `./api?zip=${encodeURIComponent(zip)}` : `./api`)
    .then(res => callback(res.data))
}

const dt = dt =>
  new Date(dt * 1000).toDateString() === new Date().toDateString()
    ? 'Today'
    : new Date(dt * 1000).toDateString() ===
      new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toDateString()
    ? 'Tomorrow'
    : new Date(dt * 1000).toDateString()

export { convert, toTimeString, round, fetchWeather, dt, isDev, isProd, isTest }
