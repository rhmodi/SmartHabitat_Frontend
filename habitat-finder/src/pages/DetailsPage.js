
import React from "react";
import Card from 'react-bootstrap/Card';
import Header from "../components/Header";

export const DetailsPage = () => {

    const defaultMetrics = [
        { name: "Heat Index", value: 0 },
        { name: "AQI", value: 0 },
        { name: "Precipitation Index", value: 0 },
        { name: "UV Index", value: 0 },
        { name: "Relative Critical Crime Index", value: 0 },
        { name: "Relative Serious Crime Index", value: 0 },
        { name: "Relative Moderate Crime Index", value: 0 }
      ];

      const getMetricsFromLocalStorage = () => {
        const storedMetrics = localStorage.getItem('Metrics');//Remember to store that value in localstorage
        return storedMetrics ? JSON.parse(storedMetrics) : [];
      };
    
      const providedMetrics = getMetricsFromLocalStorage();
      const metrics = defaultMetrics.map(dm=>{
        const pm = providedMetrics.find(m=>m.name===dm.name);
        return pm || dm
      });

      const environmentMetrics = metrics.filter(m => ["Heat Index", "AQI", "Precipitation Index", "UV Index"].includes(m.name));
      const crimeMetrics = metrics.filter(m=>["# of Critical Crime", "# of Serious Crime", "# of Moderate Crime"].includes(m.name));

  return (
    <div className="App">
      <div className="box">
        <Header />
        <div className="detials-content">
          <h1 className="text-3xl font-bold text-center mb-4">STATISTICS(Recent Data from 2021-2022) of {providedMetrics[0].county} County</h1>
          <div className="metrics-container">
            <div className="section">
              <h2 className="text-2xl font-bold text-center mb-4">Environment Metrics</h2>
              <div className="metric-placement">
                {environmentMetrics.map((metric,index)=>(
                    <Card key={index} className="card" >
                        <Card.Body>
                            <Card.Title>{metric.name}</Card.Title>
                            <Card.Text>{metric.value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
              </div>
            </div>

            <div className="section">
              <h2 className="text-2xl font-bold text-center mb-4">Crime Metrics</h2>
              <div className="metric-placement">
              {crimeMetrics.map((metric,index)=>(
                    <Card key={index} className="card" >
                        <Card.Body>
                            <Card.Title>{metric.name}</Card.Title>
                            <Card.Text>{metric.value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
