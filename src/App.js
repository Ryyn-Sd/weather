import React, { useState } from 'react'
import './App.css';
/*
let's talk in template literal strings
OK
or not
let's talk in multiline comments!
Or use the chat
so. what should the app look like? just use html on 12-14 and css in App.css
also you need the weird <> </> things

*/
function App() {
  const [ section, setSection ] = useState(0)
  return (
    <>
      <ul>
        <li onClick={() => setSection('daily')}>Daily</li>
        <li onClick={() => setSection('hourly')}>Hourly</li>
        <li className="search"><input type="text" placeholder="Type in a location…"></input></li>
      </ul>
      {section === 'daily' ? <Daily /> : null}
      {section === 'hourly' ? <Hourly /> : null}
    </>
  );
}
function Daily() {
  return (
    <div className="section daily">
      Daily:
    </div>
  )
}

function Hourly() {
  return (
    <div className="section hourly">
      Hourly:
    </div>
  )
}

export default App;
