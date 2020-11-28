import React from 'react'
import icons from '../icons'
import { convert, toTimeString, round, dt } from '../utilities'

const DisplayDay = props => {
  const { weather } = props
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
                <td>{round((weather.pressure * 100) / 3386, 2)} (inHg)</td>
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

export default DisplayDay
