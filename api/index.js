const axios = require('axios')
module.exports = (req, res) => {
  if (req.headers.host)
    res.setHeader('Access-Control-Allow-Origin', req.headers.host)
  if (req.query.lat && req.query.lon) {
    const { lat, lon } = req.query
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
  } else if (req.query.zip) {
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
      })
  } else if (req.headers['x-forwarded-for']) {
    axios
      .get(
        `http://ip-api.com/json/${encodeURIComponent(
          req.headers['x-forwarded-for']
        )}?fields=zip,lat,lon`
      )
      .then(resp => {
        const { lat, lon, zip } = resp.data
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
      })
  } else {
    res.json({})
  }
}
