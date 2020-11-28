require('dotenv').config()
const axios = require('axios')
module.exports = (req, res) => {
  try {
    if (req.query.lat && req.query.lon) {
      const { lat, lon } = req.query
      if (!(Number(lat) && Number(lon))) throw null
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(
            lat
          )}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(
            process.env.appid
          )}`
        )
        .then(resp => resp.data)
        .then(resp => res.json(resp))
        .catch(e => {
          console.error(e)
          return res.json({})
        })
        .finally(() => res.setHeader('Cache-Control', 'public, max-age=300'))
    } else if (req.query.zip) {
      if (
        !Number(req.query.zip) ||
        Number(req.query.zip) < 10000 ||
        Number(req.query.zip) > 99999
      )
        throw null
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
            req.query.zip
          )},US&appid=${encodeURIComponent(process.env.appid)}`
        )
        .then(resp => {
          const { lat, lon } = resp.data.coord
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(
                lat
              )}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(
                process.env.appid
              )}`
            )
            .then(resp => resp.data)
            .then(resp => res.json({ ...resp, zip: req.query.zip }))
            .catch(e => {
              console.error(e)
              return res.json({})
            })
        })
        .catch(e => {
          console.error(e)
          return res.json({})
        })
        .finally(() => res.setHeader('Cache-Control', 'public, max-age=300'))
    } else if (req.headers['x-forwarded-for']) {
      axios
        .get(
          `http://ip-api.com/json/${encodeURIComponent(
            req.headers['x-forwarded-for'] === '::1' ||
              req.headers['x-forwarded-for'].includes('127.0.0.1')
              ? ''
              : req.headers['x-forwarded-for']
          )}?fields=zip,lat,lon`
        )
        .then(resp => {
          const { lat, lon, zip } = resp.data
          if (
            !(Number(lat) && Number(lon) && Number(zip)) ||
            Number(zip) < 10000 ||
            Number(zip) > 99999
          )
            throw null
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(
                lat
              )}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(
                process.env.appid
              )}`
            )
            .then(resp => resp.data)
            .then(resp => res.json({ ...resp, zip }))
            .catch(e => {
              console.error(e)
              return res.json({})
            })
        })
        .catch(e => {
          console.error(e)
          return res.json({})
        })
        .finally(() =>
          res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=0')
        )
    } else {
      return res.json({})
    }
  } catch (e) {
    console.log(e)
    return res.json({})
  }
}
