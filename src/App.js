import React, { useState } from 'react';
import Calendar from './lib/index'
import './lib/index.css'
import './App.css';

const App = () => {
  const [focused ,setFocused] = useState(false);
  return (
    <div>
        <Calendar
          focused={focused}
          format="YYYY/MM/DD"
          date="2019/12/13"
          onBlur={() => {
            setFocused(false)
          }}
        />
        <input
          type="button"
          value="Focus date input with a button"
          onClick={() => {
            setFocused(true)
          }}
        />
        <div
          onClick={() => {
            setFocused(true)
          }}
        >
          Focus date input with a div
        </div>
      </div>
  );
}

export default App;
