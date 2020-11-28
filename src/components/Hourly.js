import React from 'react'
import { convert, toTimeString } from '../utilities'

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

export default Hourly
