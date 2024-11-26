import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import React, { useState } from 'react';

const HomePage = () => {
    const [crimeValue, setCrimeValue] = useState(50);
    const [environmentValue, setEnvironmentValue] = useState(50);
  
    const handleCrimeChange = (e) => setCrimeValue(e.target.value);
    const handleEnvironmentChange = (e) => setEnvironmentValue(e.target.value);
    return (
      <div className="App">
        <div className="box">
          <Header />
          <Dropdown />
          <div className="slider-container">
            <label className="slider-label">Crime</label>
            <div className="slider-with-percentage">
            <input
              type="range"
              min="0"
              max="100"
              value={crimeValue}
              onChange={handleCrimeChange}
              className="slider"
              style={{
                '--slider-progress': `${crimeValue}%`,
              }}
            />
              <span className="percentage">{crimeValue}%</span>
            </div>
            
            <label className="slider-label">Environment</label>
            <div className="slider-with-percentage">
            <input
              type="range"
              min="0"
              max="100"
              value={environmentValue}
              onChange={handleEnvironmentChange}
              className="slider"
              style={{
                '--slider-progress': `${environmentValue}%`,
              }}
            />
              <span className="percentage">{environmentValue}%</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HomePage;