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
          format="YYYYMMDD"
          date="20191213"
          closeOnSelect={true}
          onBlur={() => {
            setFocused(false)
          }}
        />
      </div>
  );
}

export default App;
