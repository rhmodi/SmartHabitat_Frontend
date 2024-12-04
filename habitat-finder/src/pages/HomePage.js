import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import PriorityList from "../components/PriorityList";
import apiService from "../services/apiService";


const HomePage = () => {
  const [sliderValue, setSliderValue] = useState(2);
  const [selectedCity,setSelectedCity] = useState("Any");

  const [items, setItems] = useState([
    { id: "task-1", text: "Air Quality Index", message: "Higher indicates more air pollution!" },
    { id: "task-2", text: "Heat Metric Index", message: "Higher indicates more temperature!" },
    { id: "task-3", text: "UV Radiation Index", message: "Higher indicates higher exposure to UV!" },
    { id: "task-4", text: "Precipitation and Flooding Index", message: "Higher indicates heavier rains!" },
  ]);

  const preferences = [
    { environment: "Strong preference to good environment", crime: "Very low preference to less crime" },
    { environment: "Medium preference to good environment", crime: "Low preference to less crime" },
    { environment: "Neutral preference to both", crime: "Neutral preference to both" },
    { environment: "Low preference to good environment", crime: "Medium preference to less crime" },
    { environment: "Very low preference to good environment", crime: "Strong preference to less crime" },
  ];

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const crimePreferencePercent = (sliderValue*100)/4;
    const environmentPreferencePercent = Math.abs((4-sliderValue)*100)/4;
    const priorities = items.map((item) => item.id);

    const defaultPayload = {
      city: selectedCity || "any",
      crimePreferencePercent: 0,
      environmentPreferencePercent: 0,
      airQualityPriority: 0,
      heatMetricPriority: 0,
      uvRadiationPriority: 0,
      precipationPriority: 0,
    };
  
    const dynamicValues = {
      crimePreferencePercent,
      environmentPreferencePercent,
      airQualityPriority: (4-priorities.indexOf("task-1")),
      heatMetricPriority: (4-priorities.indexOf("task-2")),
      uvRadiationPriority: (4-priorities.indexOf("task-3")),
      precipationPriority: (4-priorities.indexOf("task-4")),
    };

    const preference = { ...defaultPayload, ...dynamicValues };
    try {
      const habitatResponse = await apiService.requestHabitat(preference);
      console.log("Habitat Response: ", habitatResponse); // Log the response to debug
      const responseBody = habitatResponse; // Ensure the response is properly parsed
      console.log("Response Body: ", responseBody); // Log the response body to debug
      if (responseBody && responseBody.length > 0) {
        const results = responseBody.map((item) => {
          const iri = Object.keys(item)[0];
          const score = item[iri];
          return { iri, score };
        });
        console.log("Results: ", results);
        localStorage.setItem("Metrics", JSON.stringify(results));
        toast.success('Request is being Processed', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });

        setTimeout(() => {
          navigate("/results");
        }, 2000);
      } else {
        throw new Error("Response body is null or undefined");
      }
    } catch (error) {
      toast.error('Internal Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      console.log("Error sending Data: ", error);
    }
  };

  return (
    <div className="App">
      <div className='box'>
       <ToastContainer />
       <div className="container">
        <Header />
        <Dropdown value={selectedCity} onChange={handleCityChange}/>
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
        <PriorityList items={items} setItems={setItems} style={{ marginTop: "0px", marginBottom: "10px" }}/>

        <div className='button-container'>
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
    
      </div>
    </div>
  );
};

export default HomePage;
