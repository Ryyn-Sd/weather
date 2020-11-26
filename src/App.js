import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import icons from './icons'

const convert = (start, endUnit, round) => endUnit && endUnit.toLocaleLowerCase() === "c" ? start - 273.15 : (start - 273.15) * 1.8 + 32

const round = (num, amount) => Math.round(Number(num) * 10 ** (amount || 0)) / 10 ** (amount || 0)

const fetchWeather = async (value, callback) => axios.get(`https://weather-lilac.vercel.app/api?value=${encodeURIComponent(value)}`).then(res => callback(res.data))

const dt = dt => (new Date(dt * 1000)).toDateString() === new Date().toDateString() ? 'Today' : (new Date(dt * 1000)).toDateString() === (new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)).toDateString() ? 'Tomorrow' : (new Date(dt * 1000)).toDateString()

const App = () => {
    const [section, setSection] = useState('')
    const [area, setArea] = useState('')
    const [weather, setWeather] = useState({})
    const [unit, setUnit] = useState(true)
    useEffect(() => {
        axios.get(`http://ip-api.com/json/?fields=zip`).then(res => res.data.zip)
            .then(res => {
                setArea(res)
                fetchWeather(res, setWeather)
            })
    }, [])
    return (
        <>
            <ul>
                <li onClick={() => setSection('daily')}>Daily</li>
                <li onClick={() => setSection('hourly')}>Hourly</li>
                <li className="search"><input id="search" type="text" onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        const value = parseInt(document.getElementById('search').value)
                        setArea(value)
                        fetchWeather(value, setWeather)
                    }
                }} placeholder="Type in a zip code..."></input></li>
                <li className="search"><input type="checkbox" /> Celcius</li>
            </ul>

            <img src={icons["01d"]} />
            {section !== 'daily' && section !== 'hourly' ? <div><h1>Viewing weather for {area}</h1><h3>Click on Daily or Hourly to see the weather. You can change the zip code in the top right corner. You can change the unit using the Celcius checkbox.</h3></div> : null}
            {section === 'daily' ? <Daily area={area} weather={weather} /> : null}
            {section === 'hourly' ? <Hourly area={area} weather={weather} /> : null}
        </>
    );
}
const Daily = props => {
<<<<<<< HEAD
    const [day, setDay] = useState(-1);
    const weather = props.weather.daily || Array(7).fill('Loading...')
    return (
        <div className="section daily">
            <h1>Daily Weather for {props.area}</h1>
            <table>
                <tbody>
                    <tr key={0}>
                        <th>Day</th>
                        <th>Weather</th>
                    </tr>
                    {
                        weather.map((v, i) => (
                            <tr key={i + 1}>
                                <td>{dt(v.dt)}</td>
                                <td>{v.weather ? `${v.weather[0].description}, the tempature is ${round(convert(v.temp.day))}, the high is ${round(convert(v.temp.max))}, the low is ${round(convert(v.temp.min))}` : v} <button onClick={() => setDay(i)}>Find out more</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {day >= 0 ? <DisplayDay weather={weather[day]} /> : null}
        </div>
    )
}

function Hourly(props) {
    const toHourString = date => `${date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:00 ${date.getHours() >= 12 ? "PM" : "AM"}`
    const weather = props.weather.hourly || Array(24).fill('Loading...')
    return (
        <div className="section hourly">
            <h1>Hourly Weather for {props.area}</h1>
            <table>
                <tbody>
                    <tr key={0}>
                        <th>Time</th>
                        <th>Weather</th>
                    </tr>
                    {
                        Array(24).fill().map((_, i) => (
                            <tr key={i + 1}>
                                <td>{toHourString(new Date(weather[i].dt * 1000))}</td>
                                <td>{weather[i].weather[0].description}, the tempature is {round(convert(weather[i].temp))}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

const DisplayDay = (props) => {
    const { weather } = props
    return (
        <div className="DisplayDay" style={{margin: 64}}>
            <h1>{dt(weather.dt)}</h1>
            <div class="flex-container">
                <div class="flex-1">
                    <table>
                        <thead>
                        <th colspan={2}><h3>Day details</h3></th>
                        </thead>
                        <tbody>
                            <tr><th>Day</th><td>Friday the 13th</td></tr>
                            <tr><td>Sunrise</td><td>6:00 AM</td></tr>
                            <tr><td>Sunset</td><td>6:00 PM</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex-2">
                    <table>
                      <thead><th colspan={2}><h3>Tempature</h3></th></thead>
                        <tbody>
                          <tr><th>Tempature</th><td>30˚ F.</td></tr>
                          <tr><th>High</th><td>60˚ F.</td></tr>
                          <tr><th>Low</th><td>10˚ F.</td></tr>
                          <tr><th>Night</th><td>11˚ F.</td></tr>
                          <tr><th>Evening</th><td>15˚ F.</td></tr>
                          <tr><th>Morning</th><td>14˚ F.</td></tr>
                        </tbody>
                    </table>
                    <table>
                      <thead><th colspan={2}><h3>Feels Like</h3></th></thead>
                        <tbody>
                          <tr><th>Tempature</th><td>30˚ F.</td></tr>
                          <tr><th>High</th><td>60˚ F.</td></tr>
                          <tr><th>Low</th><td>10˚ F.</td></tr>
                          <tr><th>Night</th><td>11˚ F.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
=======
  const [day, setDay] = useState(-1);
  const weather = props.weather.daily || Array(7).fill('Loading...')
  return (
    <div className="section daily">
      <h1>Daily Weather for {props.area}</h1>
      <table>
        <tbody>
          <tr key={0}>
            <th>Day</th>
            <th>Weather</th>
          </tr>
          {
            weather.map((v, i) => (
              <tr key={i+1}>
                <td>{dt(v.dt)}</td>
                <td>{v.weather ? `${v.weather[0].description}, the tempature is ${round(convert(v.temp.day))}, the high is ${round(convert(v.temp.max))}, the low is ${round(convert(v.temp.min))}` : v} <button onClick={() => setDay(i)}>Find out more</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {day >= 0 ? <DisplayDay weather={weather[day]}/> : null}
    </div>
  )
}

function Hourly(props) {
  const toHourString = date => `${date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:00 ${date.getHours() >= 12 ? "PM" : "AM"}`
  const weather = props.weather.hourly || Array(24).fill('Loading...')
  return (
    <div className="section hourly">
      <h1>Hourly Weather for {props.area}</h1>
      <table>
        <tbody>
          <tr key={0}>
            <th>Time</th>
            <th>Weather</th>
          </tr>
          {
            Array(24).fill().map((_, i) => (
              <tr key={i+1}>
                <td>{toHourString(new Date(weather[i].dt * 1000))}</td>
                <td>{weather[i].weather[0].description}, the tempature is {round(convert(weather[i].temp))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const DisplayDay = (props) => (
  <div className="DisplayDay">
    <h1>{dt(props.weather.dt)}</h1>
    {JSON.stringify(props.weather)}
  </div>
)
>>>>>>> 930b9b5085a068d657826e415535f0ac90af4967


export default App;