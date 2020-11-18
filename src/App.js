import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [section, setSection] = useState(0)
  const [area, setArea] = useState(0)
  // const [woeid, setWoeid] = useState(0)
  return (
    <>
      <ul>
        <li onClick={() => setSection('daily')}>Daily</li>
        <li onClick={() => setSection('hourly')}>Hourly</li>
        <li className="search"><input id="search" type="text" onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setArea(document.getElementById('search').value)
            // axios.get(`https://www.metaweather.com/api/location/search/?query=${encodeURIComponent(value)}`)
            //   .then(res => res.data[0])
            //   .then(res => {
            //     value = res.title
            //     setArea(res.title)
            //     setWoeid(res.woeid)
            //   })
          }
        }} placeholder="Type in a location…"></input></li>
      </ul>
      {section === 'daily' ? <Daily area={area} woeid={woeid}/> : null}
      {section === 'hourly' ? <Hourly area={area} woeid={woeid} /> : null}
    </>
  );
}
function Daily(props) {
  const [weather, setWeather] = useState(Array(14).fill('Loading...'))

  return (
    <div className="section daily">
      <h1>Daily Weather for {props.area}</h1>
      <table>
        <tbody>
          <tr>
            <th>Day</th>
            <th>Weather</th>
          </tr>
          <tr>
            <td>Today</td>
            <td>{weather[0]}</td>
          </tr>
          <tr>
            <td>Tomorrow</td>
            <td>{weather[1]}</td>
          </tr>
          {
            Array(12).fill().map((_, i) => {
              return (
                <tr>
                  <td>{(new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000)).toDateString()}</td>
                  <td>{weather[i + 2]}</td>
                </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function Hourly(props) {
  const [weather, setWeather] = useState(Array(24).fill('Loading...'))
  return (
    <div className="section hourly">
      <h1>Hourly Weather for {props.area}</h1>
      <table>
        <tbody>
          <tr>
            <th>Time</th>
            <th>Weather</th>
          </tr>
          {
            Array(24).fill().map((_, i) => {
              return (
                <tr>
                  <td>{(new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() === 0 ? 12 : (new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() > 12 ? (new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() - 12 : (new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours()}:00 {(new Date(Date.now() + (i) * 60 * 60 * 1000)).getHours() >= 12 ? "PM" : "AM"}</td>
                  <td>{weather[i]}</td>
                </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;
