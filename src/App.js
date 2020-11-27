import React, { useState, useEffect } from 'react'
import './App.css'
import icons from './icons'
import { convert, toTimeString, round, fetchWeather, dt } from './utilities'

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

const DisplayDay = props => {
  const { weather } = props
  // console.log(weather) // {"dt":1606410000,"sunrise":1606393150,"sunset":1606427714,"temp":{"day":284.7,"min":282.89,"max":284.7,"night":282.89,"eve":283.55,"morn":283.55},"feels_like":{"day":281.48,"night":280.75,"eve":281.35,"morn":280.38},"pressure":1016,"humidity":81,"dew_point":281.56,"wind_speed":4.07,"wind_deg":244,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":90,"pop":1,"rain":3.84,"uvi":1.77}
  return (
    <div className="DisplayDay" style={{ margin: 64 }}>
      <h1>{dt(weather.dt)}</h1>
      <img src={icons[weather.weather[0].icon]} alt="" />
      <div className="flex-container">
        <div className="flex-1">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>Day details</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Day</th>
                <td>{dt(weather.dt)}</td>
              </tr>
              <tr>
                <th>Sunrise</th>
                <td>{toTimeString(weather.sunrise)}</td>
              </tr>
              <tr>
                <th>Sunset</th>
                <td>{toTimeString(weather.sunset)}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>Air</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Pressure</th>
                <td>{round(weather.pressure * 100 / 3386, 2)} (inHg)</td>
              </tr>
              <tr>
                <th>Humidity</th>
                <td>{weather.humidity}%</td>
              </tr>
              <tr>
                <th>Dew Point</th>
                <td>{convert(weather.dew_point, props.unit)}</td>
              </tr>
              <tr>
                <th>UVI</th>
                <td>{weather.uvi}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>Other</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Description</th>
                <td>{weather.weather[0].description}</td>
              </tr>
              <tr>
                <th>Clouds</th>
                <td>{weather.clouds}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-2">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>Temperature</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Temperature</th>
                <td>{convert(weather.temp.day, props.unit)}</td>
              </tr>
              <tr>
                <th>High</th>
                <td>{convert(weather.temp.max, props.unit)}</td>
              </tr>
              <tr>
                <th>Low</th>
                <td>{convert(weather.temp.min, props.unit)}</td>
              </tr>
              <tr>
                <th>Night</th>
                <td>{convert(weather.temp.night, props.unit)}</td>
              </tr>
              <tr>
                <th>Morning</th>
                <td>{convert(weather.temp.morn, props.unit)}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>Feels Like</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Temperature</th>
                <td>{convert(weather.feels_like.day, props.unit)}</td>
              </tr>
              <tr>
                <th>Morning</th>
                <td>{convert(weather.feels_like.morn, props.unit)}</td>
              </tr>
              <tr>
                <th>Evening</th>
                <td>{convert(weather.feels_like.eve, props.unit)}</td>
              </tr>
              <tr>
                <th>Night</th>
                <td>{convert(weather.feels_like.night, props.unit)}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h3>Wind</h3>
                </th>
              </tr>
            </thead>
            <tr>
              <th>Wind Direction</th>
              <td>{weather.wind_deg} ˚</td>
            </tr>
            <tr>
              <th>Wind Speed</th>
              <td>
                {props.unit === 'i'
                  ? Math.round(weather.wind_speed * 2.23694).toString() + ' mph'
                  : Math.round(weather.wind_speed * 3.6).toString() + ' kmh'}
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  )
}

export default App
