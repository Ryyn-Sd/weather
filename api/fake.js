const weatherConditions = [
  {
    id: 200,
    main: 'Thunderstorm',
    description: 'thunderstorm with light rain',
    icon: '11d'
  },
  {
    id: 201,
    main: 'Thunderstorm',
    description: 'thunderstorm with rain',
    icon: '11d'
  },
  {
    id: 202,
    main: 'Thunderstorm',
    description: 'thunderstorm with heavy rain',
    icon: '11d'
  },
  {
    id: 210,
    main: 'Thunderstorm',
    description: 'light thunderstorm',
    icon: '11d'
  },
  {
    id: 211,
    main: 'Thunderstorm',
    description: 'thunderstorm',
    icon: '11d'
  },
  {
    id: 212,
    main: 'Thunderstorm',
    description: 'heavy thunderstorm',
    icon: '11d'
  },
  {
    id: 221,
    main: 'Thunderstorm',
    description: 'ragged thunderstorm',
    icon: '11d'
  },
  {
    id: 230,
    main: 'Thunderstorm',
    description: 'thunderstorm with light drizzle',
    icon: '11d'
  },
  {
    id: 231,
    main: 'Thunderstorm',
    description: 'thunderstorm with drizzle',
    icon: '11d'
  },
  {
    id: 232,
    main: 'Thunderstorm',
    description: 'thunderstorm with heavy drizzle',
    icon: '11d'
  },
  {
    id: 300,
    main: 'Drizzle',
    description: 'light intensity drizzle',
    icon: '09d'
  },
  {
    id: 301,
    main: 'Drizzle',
    description: 'drizzle',
    icon: '09d'
  },
  {
    id: 302,
    main: 'Drizzle',
    description: 'heavy intensity drizzle',
    icon: '09d'
  },
  {
    id: 310,
    main: 'Drizzle',
    description: 'light intensity drizzle rain',
    icon: '09d'
  },
  {
    id: 311,
    main: 'Drizzle',
    description: 'drizzle rain',
    icon: '09d'
  },
  {
    id: 312,
    main: 'Drizzle',
    description: 'heavy intensity drizzle rain',
    icon: '09d'
  },
  {
    id: 313,
    main: 'Drizzle',
    description: 'shower rain and drizzle',
    icon: '09d'
  },
  {
    id: 314,
    main: 'Drizzle',
    description: 'heavy shower rain and drizzle',
    icon: '09d'
  },
  {
    id: 321,
    main: 'Drizzle',
    description: 'shower drizzle',
    icon: '09d'
  },
  {
    id: 500,
    main: 'Rain',
    description: 'light rain',
    icon: '10d'
  },
  {
    id: 501,
    main: 'Rain',
    description: 'moderate rain',
    icon: '10d'
  },
  {
    id: 502,
    main: 'Rain',
    description: 'heavy intensity rain',
    icon: '10d'
  },
  {
    id: 503,
    main: 'Rain',
    description: 'very heavy rain',
    icon: '10d'
  },
  {
    id: 504,
    main: 'Rain',
    description: 'extreme rain',
    icon: '10d'
  },
  {
    id: 511,
    main: 'Rain',
    description: 'freezing rain',
    icon: '13d'
  },
  {
    id: 520,
    main: 'Rain',
    description: 'light intensity shower rain',
    icon: '09d'
  },
  {
    id: 521,
    main: 'Rain',
    description: 'shower rain',
    icon: '09d'
  },
  {
    id: 522,
    main: 'Rain',
    description: 'heavy intensity shower rain',
    icon: '09d'
  },
  {
    id: 531,
    main: 'Rain',
    description: 'ragged shower rain',
    icon: '09d'
  },
  {
    id: 600,
    main: 'Snow',
    description: 'light snow',
    icon: '13d'
  },
  {
    id: 601,
    main: 'Snow',
    description: 'Snow',
    icon: '13d'
  },
  {
    id: 602,
    main: 'Snow',
    description: 'Heavy snow',
    icon: '13d'
  },
  {
    id: 611,
    main: 'Snow',
    description: 'Sleet',
    icon: '13d'
  },
  {
    id: 612,
    main: 'Snow',
    description: 'Light shower sleet',
    icon: '13d'
  },
  {
    id: 613,
    main: 'Snow',
    description: 'Shower sleet',
    icon: '13d'
  },
  {
    id: 615,
    main: 'Snow',
    description: 'Light rain and snow',
    icon: '13d'
  },
  {
    id: 616,
    main: 'Snow',
    description: 'Rain and snow',
    icon: '13d'
  },
  {
    id: 620,
    main: 'Snow',
    description: 'Light shower snow',
    icon: '13d'
  },
  {
    id: 621,
    main: 'Snow',
    description: 'Shower snow',
    icon: '13d'
  },
  {
    id: 622,
    main: 'Snow',
    description: 'Heavy shower snow',
    icon: '13d'
  },
  {
    id: 701,
    main: 'Mist',
    description: 'mist',
    icon: '50d'
  },
  {
    id: 711,
    main: 'Smoke',
    description: 'Smoke',
    icon: '50d'
  },
  {
    id: 721,
    main: 'Haze',
    description: 'Haze',
    icon: '50d'
  },
  {
    id: 731,
    main: 'Dust',
    description: 'sand/ dust whirls',
    icon: '50d'
  },
  {
    id: 741,
    main: 'Fog',
    description: 'fog',
    icon: '50d'
  },
  {
    id: 751,
    main: 'Sand',
    description: 'sand',
    icon: '50d'
  },
  {
    id: 761,
    main: 'Dust',
    description: 'dust',
    icon: '50d'
  },
  {
    id: 762,
    main: 'Ash',
    description: 'volcanic ash',
    icon: '50d'
  },
  {
    id: 771,
    main: 'Squall',
    description: 'squalls',
    icon: '50d'
  },
  {
    id: 781,
    main: 'Tornado',
    description: 'tornado',
    icon: '50d'
  },
  {
    id: 800,
    main: 'Clear',
    description: 'clear sky',
    icon: '01d'
  },
  {
    id: 801,
    main: 'Clouds',
    description: 'few clouds: 11-25%',
    icon: '02d'
  },
  {
    id: 802,
    main: 'Clouds',
    description: 'scattered clouds: 25-50%',
    icon: '03d'
  },
  {
    id: 803,
    main: 'Clouds',
    description: 'broken clouds: 51-84%',
    icon: '04d'
  },
  {
    id: 804,
    main: 'Clouds',
    description: 'overcast clouds: 85-100%',
    icon: '04d'
  }
]

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

const data = {
  lat: 40.78,
  lon: -73.98,
  timezone: 'America/New_York',
  timezone_offset: -18000,
  zip: Math.floor(Math.random() * 99450) + 501,
  current: {
    dt: Math.floor(Date.now() / 1000),
    sunrise: Math.floor(sunriseset(40.78, -73.98, true).getTime() / 1000),
    sunset: Math.floor(sunriseset(40.78, -73.98, false).getTime() / 1000),
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
      weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
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

module.exports = (req, res) => res.json(data)
