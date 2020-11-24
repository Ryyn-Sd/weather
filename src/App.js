import React, { useState } from 'react'
import './App.css';
import axios from 'axios'

function convert(start, endUnit, round) {
  if (endUnit && endUnit.toLocaleLowerCase() === "c") {
    return start - 273.15
  } else {
    return (start - 273.15) * 1.8 + 32
  }
}

function round(num, amount) {
  return Math.round(Number(num) * 10 ** (amount || 0)) / 10 ** (amount||0)
}

function App() {
  const [section, setSection] = useState('')
  const [area, setArea] = useState('')
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState(true)
  axios.get(`http://ip-api.com/json/?fields=zip`).then(res => res.data.zip)
    .then(res => {
      setArea(res)
      axios.get(`https://weather-lilac.vercel.app/api?value=${encodeURIComponent(res)}`).then(res => setWeather(res.data))
    })
  return (
    <>
      <ul>
        <li onClick={() => setSection('daily')}>Daily</li>
        <li onClick={() => setSection('hourly')}>Hourly</li>
        <li className="search"><input id="search" type="text" onKeyPress={(e) => {
          if (e.key === 'Enter') {
            const value = parseInt(document.getElementById('search').value)
            setArea(value)
            axios.get(`https://weather-lilac.vercel.app/api?value=${encodeURIComponent(value)}`)
              .then(res => setWeather(res.data))
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
  const renderDailyWeather = n => `${weather[n].weather[0].description}, the tempature is ${round(convert(weather[n].temp.day))}, the high is ${round(convert(weather[n].temp.max))}, the low is ${round(convert(weather[n].temp.min))}`
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
          <tr key={1}>
            <td>Today</td>
            <td>{renderDailyWeather(0)} <button onClick={() => setDay(1)}>Find out more</button></td>
          </tr>
          <tr key={2}>
            <td>Tomorrow</td>
            <td>{renderDailyWeather(1)} <button onClick={() => setDay(2)}>Find out more</button></td>
          </tr>
          {
            Array(5).fill().map((_, i) => {
              return (
                <tr key={i+3}>
                  <td>{(new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000)).toDateString()}</td>
                  <td>{renderDailyWeather(i + 2)} <button onClick={() => setDay(i + 3)}>Find out more</button></td>
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
