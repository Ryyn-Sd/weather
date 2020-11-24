import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

const convert = (start, endUnit, round) => endUnit && endUnit.toLocaleLowerCase() === "c" ? start - 273.15 : (start - 273.15) * 1.8 + 32

const round = (num, amount) => Math.round(Number(num) * 10 ** (amount || 0)) / 10 ** (amount || 0)

const fetchWeather = async (value, callback) => axios.get(`https://weather-lilac.vercel.app/api?value=${encodeURIComponent(value)}`).then(res => callback(res.data))

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
        <li className="search"><input type="checkbox"  /> Celcius</li>
      </ul>

      {section !== 'daily' && section !== 'hourly' ? <div><h1>Viewing weather for {area}</h1><h3>Click on Daily or Hourly to see the weather. You can change the zip code in the top right corner. You can change the unit using the Celcius checkbox.</h3></div> : null}
      {section === 'daily' ? <Daily area={area} weather={weather} /> : null}
      {section === 'hourly' ? <Hourly area={area} weather={weather} /> : null}
    </>
  );
}
function Daily(props) {
  const [day, setDay] = useState(0);
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
            Array(7).fill().map((_, i) => {
              const dt = new Date(weather[i].dt * 1000).toDateString()
              const date = dt === new Date().toDateString() ? 'Today' : dt === (new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)).toDateString() ? 'Tomorrow' : dt
              return (
                <tr key={i+1}>
                  <td>{date}</td>
                  <td>{weather[i].weather ? `${weather[i].weather[0].description}, the tempature is ${round(convert(weather[i].temp.day))}, the high is ${round(convert(weather[i].temp.max))}, the low is ${round(convert(weather[i].temp.min))}` : weather[i]} <button onClick={() => setDay(i+1)}>Find out more</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {day > 0 ? <DisplayDay area={props.area} day={day} weather={props.weather}/> : null}
    </div>
  )
}

function Hourly(props) {
  const renderHourlyWeather = n => `${weather[n].weather[0].description}, the tempature is ${round(convert(weather[n].temp))}`
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
            Array(24).fill().map((_, i) => {
              return (
                <tr key={i+1}>
                  <td>{(new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() === 0 ? 12 : (new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() > 12 ? (new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() - 12 : (new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours()}:00 {(new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() >= 12 ? "PM" : "AM"}</td>
                  <td>{renderHourlyWeather(i)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function DisplayDay(props) {
  const weather = () => props.weather.daily[props.day - 1]  
  return (
    <div className="DisplayDay">
      <h1>{props.day === 1 ? 'Today' : props.day === 2 ? 'Tomorrow': (new Date(Date.now() + (props.day - 1) * 24 * 60 * 60 * 1000)).toDateString()}</h1>
      {JSON.stringify(weather())}
    </div>
  )
}

// {"dt":1606150800,"sunrise":1606133752,"sunset":1606168601,"temp":{"day":278.8,"min":276.24,"max":279.95,"night":276.94,"eve":277.01,"morn":276.24},"feels_like":{"day":273.31,"night":273.47,"eve":272.36,"morn":271.4},"pressure":1023,"humidity":66,"dew_point":273.02,"wind_speed":4.97,"wind_deg":287,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":63,"pop":1,"rain":1.37,"uvi":1.72}

export default App;
