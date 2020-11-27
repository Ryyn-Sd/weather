import React, { useState } from 'react'
import { convert, dt } from '../utilities'
import DisplayDay from './DisplayDay'

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

export default Daily