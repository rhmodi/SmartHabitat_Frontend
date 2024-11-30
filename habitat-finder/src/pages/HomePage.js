import React, { useState } from "react";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import PriorityList from "../components/PriorityList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [sliderValue, setSliderValue] = useState(2);

  const preferences = [
    { environment: "Strong preference to environment", crime: "Very low preference to crime" },
    { environment: "Medium preference to environment", crime: "Low preference to crime" },
    { environment: "Neutral preference to both", crime: "Neutral preference to both" },
    { environment: "Low preference to environment", crime: "Medium preference to crime" },
    { environment: "Very low preference to environment", crime: "Strong preference to crime" },
  ];

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/results");
  };

  return (
    <div className="App">
      <div className="box">
        <Header />
        <Dropdown />
        <h2>Preference Slider</h2>
        <div className="slider-container">
          <div className="slider-labels">
            <span className="slider-label left">Environment</span>
            <span className="slider-label right">Crime</span>
          </div>
          <div
            className="slider-with-buttons"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="range"
                min="0"
                max="4"
                step="1"
                value={sliderValue}
                onChange={handleSliderChange}
                className="slider"
                style={{
                  width: "100%",
                  cursor: "pointer",
                  accentColor: "#7e57c2",
                  appearance: "none",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#dcdcdc",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "absolute",
                  top: "100%",
                  width: "100%",
                }}
              >
                {[0, 1, 2, 3, 4].map((mark) => (
                  <span
                    key={mark}
                    style={{
                      fontSize: "12px",
                      color: "#7e57c2",
                      transform: "translateX(-50%)",
                    }}
                  >
                    |
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="preferences-text" style={{ marginTop: "20px" }}>
            <p>{preferences[sliderValue].environment}</p>
            <p>{preferences[sliderValue].crime}</p>
          </div>
        </div>
        <br />
        <br />
        <PriorityList />
        <button
          onClick={handleButtonClick}
          style={{
            backgroundColor: "#7e57c2",
            color: "white",
            padding: "12px 25px",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            marginTop: "20px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#6a47a7";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#7e57c2";
          }}
        >
          Find me a city based on these preferences!
        </button>
      </div>
    </div>
  );
};

export default HomePage;
