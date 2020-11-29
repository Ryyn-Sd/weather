import React, { useState, useEffect } from 'react'
import './App.css'
import icons from './icons'
import { fetchWeather } from './utilities'
import Hourly from './components/Hourly'
import Daily from './components/Daily'

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
        <img src={icons[weather.current.weather[0].icon]} alt="" />
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

export default App
