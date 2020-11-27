import React, { useState, useEffect } from 'react'
import './App.css'
import icons from './icons'
import { convert, toTimeString, fetchWeather, dt } from './utilities'
import DisplayDay from './components/DisplayDay'

const App = () => {
  const [section, setSection] = useState('')
  const [area, setArea] = useState('')
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('i')
  useEffect(() => {
    const localUnit = localStorage.getItem('unit')
    if (localUnit === 'm' || localUnit === 'i') setUnit(localUnit)
    fetchWeather(weather => {
      setWeather(weather)
      setArea(weather.zip)
    })
  }, [])
  return (
    <>
      <ul>
        <li onClick={() => setSection('daily')}>Daily</li>
        <li onClick={() => setSection('hourly')}>Hourly</li>
        <li className="search">
          <input
            id="search"
            type="text"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                const value = parseInt(document.getElementById('search').value)
                setArea(value)
                fetchWeather(setWeather, value)
              }
            }}
            placeholder="Type in a zip code..."
          ></input>
        </li>
        <li className="search">
          <input
            type="checkbox"
            checked={unit === 'm' ? true : false}
            onChange={e => {
              localStorage.setItem('unit', e.target.checked ? 'm' : 'i')
              setUnit(e.target.checked ? 'm' : 'i')
            }}
          />
          Metric Units
        </li>
      </ul>
      {weather.current ? (
        <img src={icons[weather.daily[0].weather[0].icon]} alt="" />
      ) : null}
      {section !== 'daily' && section !== 'hourly' ? (
        <div>
          <h1>Viewing weather for {area}</h1>
          <h3>
            Click on Daily or Hourly to see the weather. You can change the zip
            code in the top right corner. You can change the units using the
            metric checkbox.
          </h3>
        </div>
      ) : null}
      {section === 'daily' ? (
        <Daily area={area} weather={weather} unit={unit} />
      ) : null}
      {section === 'hourly' ? (
        <Hourly area={area} weather={weather} unit={unit} />
      ) : null}
    </>
  )
}
const Daily = props => {
  const [day, setDay] = useState(-1)
  const weather = props.weather.daily || Array(7).fill('Loading...')
  if (weather.weather) weather.sort((a, b) => a.dt - b.dt)
  return (
    <div className="section daily">
      <h1>Daily Weather for {props.area}</h1>
      <table>
        <tbody>
          <tr key={0}>
            <th>Day</th>
            <th>Weather</th>
          </tr>
          {weather.map((v, i) => (
            <tr key={i + 1}>
              <td>{dt(v.dt)}</td>
              <td>
                {v.weather
                  ? `${v.weather[0].description}, the tempature is ${convert(
                      v.temp.day,
                      props.unit
                    )}, the high is ${convert(
                      v.temp.max,
                      props.unit
                    )}, the low is ${convert(v.temp.min, props.unit)}`
                  : v}{' '}
                <button onClick={() => setDay(i)}>Find out more</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {day >= 0 ? (
        <DisplayDay weather={weather[day]} unit={props.unit} />
      ) : null}
    </div>
  )
}

function Hourly(props) {
  const weather = props.weather.hourly || Array(24).fill('Loading...')
  if (weather.weather) weather.sort((a, b) => a.dt - b.dt)
  console.log(weather)
  return (
    <div className="section hourly">
      <h1>Hourly Weather for {props.area}</h1>
      <table>
        <tbody>
          <tr key={0}>
            <th>Time</th>
            <th>Weather</th>
          </tr>
          {weather.map((v, i) => (
            <tr key={i + 1}>
              <td>{toTimeString(v.dt)}</td>
              <td>
                {v.weather[0].description}, the tempature is{' '}
                {convert(v.temp, props.unit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
