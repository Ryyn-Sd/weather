import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const isTest = process.env.NODE_ENV === 'test'

const isProd = process.env.NODE_ENV === 'production'

// https://math.stackexchange.com/questions/2186683#comment7725199_2598266
const sunriseset = (a, b, c, d = new Date()) => {
  const e = new Date(d.getFullYear(), 0, 0),
    f = Math.floor(
      (d - e + 1e3 * (60 * (e.getTimezoneOffset() - d.getTimezoneOffset()))) /
        86400000
    ),
    g = Math.PI / 180,
    h = 180 / Math.PI,
    i = f + ((c ? 6 : 18) - b / 15) / 24,
    j = 0.9856 * i - 3.289,
    k =
      j +
      1.916 * Math.sin(j * g) +
      0.02 * Math.sin(2 * j * g) +
      282.634 +
      (360 < j + 1.916 * Math.sin(j * g) + 0.02 * Math.sin(2 * j * g) + 282.634
        ? -360
        : 0 > j + 1.916 * Math.sin(j * g) + 0.02 * Math.sin(2 * j * g) + 282.634
        ? 360
        : 0),
    l =
      ((360 < h * Math.atan(0.91764 * Math.tan(k * g))
        ? h * Math.atan(0.91764 * Math.tan(k * g)) - 360
        : 0 > h * Math.atan(0.91764 * Math.tan(k * g))
        ? h * Math.atan(0.91764 * Math.tan(k * g)) + 360
        : h * Math.atan(0.91764 * Math.tan(k * g))) +
        (90 * Math.floor(k / 90) -
          90 *
            Math.floor(
              (360 < h * Math.atan(0.91764 * Math.tan(k * g))
                ? h * Math.atan(0.91764 * Math.tan(k * g)) - 360
                : 0 > h * Math.atan(0.91764 * Math.tan(k * g))
                ? h * Math.atan(0.91764 * Math.tan(k * g)) + 360
                : h * Math.atan(0.91764 * Math.tan(k * g))) / 90
            ))) /
      15,
    m = 0.39782 * Math.sin(k * g),
    n = Math.cos(Math.asin(m)),
    o = (Math.cos((545 / 6) * g) - m * Math.sin(a * g)) / (n * Math.cos(a * g)),
    p = (c ? 360 - h * Math.acos(o) : h * Math.acos(o)) / 15,
    q = p + l - 0.06571 * i - 6.622,
    r = q - b / 15 + (24 < q - b / 15 ? -24 : 0 > q - b / 15 ? 24 : 0),
    s = new Date(1e3 * (60 * (60 * r)))
  return (
    s.setFullYear(d.getFullYear()),
    s.setMonth(d.getMonth()),
    s.setDate(d.getDate()),
    s
  )
}

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
  try {
    if (isDev && process.env.REACT_APP_NODE_ENV !== 'production') {
      import('./weatherConditions.json')
        .then(w => w.default)
        .then(weatherConditions => {
          const data = {
            lat: 40.78,
            lon: -73.98,
            timezone: 'America/New_York',
            timezone_offset: -18000,
            zip: zip || Math.floor(Math.random() * 99450) + 501,
            current: {
              dt: Math.floor(Date.now() / 1000),
              sunrise: Math.floor(
                sunriseset(40.78, -73.98, true).getTime() / 1000
              ),
              sunset: Math.floor(
                sunriseset(40.78, -73.98, false).getTime() / 1000
              ),
              temp: Math.random() * 50 + 250,
              feels_like: Math.random() * 50 + 250,
              pressure: Math.floor(Math.random() * 250 + 850),
              humidity: Math.floor(Math.random() * 100),
              dew_point: Math.random() * 15 + 273.15,
              uvi: Math.floor(Math.random() * 10),
              clouds: Math.floor(Math.random() * 101),
              visibility: Math.floor(Math.random() * 10000),
              wind_speed: Math.floor(Math.random() * 50),
              wind_deg: Math.floor(Math.random() * 361),
              weather: [
                weatherConditions[
                  Math.floor(Math.random() * weatherConditions.length)
                ]
              ]
            },
            minutely: (() => {
              const result = [
                {
                  dt: Math.floor(Date.now() / 1000),
                  precipitation: Math.floor(Math.random() * 101)
                }
              ]
              Array(60)
                .fill()
                .map((_, i) => {
                  const precipitation = result[result.length - 1].precipitation
                  return result.push({
                    dt: Math.floor(Date.now() / 1000) + 60 * (i + 1),
                    precipitation:
                      precipitation +
                      ((Math.random() > 0.5 || precipitation === 0) &&
                      precipitation !== 100
                        ? 1
                        : -1)
                  })
                })
              return result
            })(),
            hourly: Array(48)
              .fill()
              .map((v, i) => {
                return {
                  dt:
                    Math.floor(
                      (() => {
                        const d = new Date()
                        d.setMinutes(0, 0, 0)
                        return d
                      })() / 1000
                    ) +
                    3600 * i,
                  temp: Math.random() * 50 + 250,
                  feels_like: Math.random() * 50 + 250,
                  pressure: Math.floor(Math.random() * 250 + 850),
                  humidity: Math.floor(Math.random() * 100),
                  dew_point: Math.random() * 15 + 273.15,
                  uvi: Math.floor(Math.random() * 10),
                  clouds: Math.floor(Math.random() * 101),
                  visibility: Math.floor(Math.random() * 10000),
                  wind_speed: Math.floor(Math.random() * 50),
                  wind_deg: Math.floor(Math.random() * 361),
                  weather: [
                    weatherConditions[
                      Math.floor(Math.random() * weatherConditions.length)
                    ]
                  ],
                  pop: Number(Math.random() > 0.5)
                }
              }),
            daily: Array(7)
              .fill()
              .map((v, i) => {
                const dt = Math.floor(
                  (() => {
                    const d = new Date()
                    d.setHours(12, 0, 0, 0)
                    return d.getTime()
                  })() /
                    1000 +
                    86400 * i
                )
                return {
                  dt: dt,
                  sunrise: Math.floor(
                    sunriseset(40.78, -73.98, true, new Date(dt * 1000)) / 1000
                  ),
                  sunset: Math.floor(
                    sunriseset(40.78, -73.98, false, new Date(dt * 1000)) / 1000
                  ),
                  temp: Object.fromEntries(
                    Array(6)
                      .fill()
                      .sort((a, b) => a - b)
                      .map((v, i) => {
                        return [
                          ['min', 'morn', 'night', 'eve', 'day', 'max'][i],
                          Math.random() * 50 + 250
                        ]
                      })
                  ),
                  feels_like: Object.fromEntries(
                    Array(4)
                      .fill()
                      .sort((a, b) => a - b)
                      .map((v, i) => {
                        return [
                          ['morn', 'night', 'eve', 'day'][i],
                          Math.random() * 50 + 250
                        ]
                      })
                  ),
                  pressure: Math.floor(Math.random() * 250 + 850),
                  humidity: Math.floor(Math.random() * 100),
                  dew_point: Math.random() * 15 + 273.15,
                  uvi: Math.floor(Math.random() * 10),
                  clouds: Math.floor(Math.random() * 101),
                  wind_speed: Math.floor(Math.random() * 50),
                  wind_deg: Math.floor(Math.random() * 361),
                  weather: [
                    weatherConditions[
                      Math.floor(Math.random() * weatherConditions.length)
                    ]
                  ],
                  pop: Number(Math.random() > 0.5)
                }
              })
          }
          callback(data)
        })
    } else {
      callback(
        (
          await axios.get(
            zip ? `./api?zip=${encodeURIComponent(zip)}` : `./api`
          )
        ).data
      )
    }
  } catch (error) {
    callback({ error })
  }
}

const dt = dt =>
  new Date(dt * 1000).toDateString() === new Date().toDateString()
    ? 'Today'
    : new Date(dt * 1000).toDateString() ===
      new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toDateString()
    ? 'Tomorrow'
    : new Date(dt * 1000).toDateString()

export {
  convert,
  toTimeString,
  round,
  fetchWeather,
  dt,
  sunriseset,
  isDev,
  isTest,
  isProd
}
