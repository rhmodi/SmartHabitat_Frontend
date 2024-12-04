import React from "react";
import Card from 'react-bootstrap/Card';
import Header from "../components/Header";
import apiService from "../services/apiService";

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

      const cityInfo = JSON.parse(localStorage.getItem("CityInfo")) || {};

      const payload = {
        IRI: cityInfo.iri || "",
        name: cityInfo.name || "",
        seriousCrimeIndex: parseFloat((metrics.find(m => m.name === "Relative Serious Crime Index")?.value || 0).toFixed(2)),
        moderateCrimeIndex: parseFloat((metrics.find(m => m.name === "Relative Moderate Crime Index")?.value || 0).toFixed(2)),
        criticalCrimeIndex: parseFloat((metrics.find(m => m.name === "Relative Critical Crime Index")?.value || 0).toFixed(2)),
        airQualityIndex: metrics.find(m => m.name === "AQI")?.value || 0,
        heatIndex: metrics.find(m => m.name === "Heat Index")?.value || 0,
        uvRadiationIndex: metrics.find(m => m.name === "UV Index")?.value || 0,
        precipitationIndex: metrics.find(m => m.name === "Precipitation Index")?.value || 0
    };

    const [communityDetails, setCommunityDetails] = React.useState({});

    React.useEffect(() => {
        const fetchCommunityDetails = async () => {
            try {
                const data = await apiService.getCommunityDetails(payload);
                setCommunityDetails(data);
            } catch (error) {
                console.error("Error fetching community details:", error);
            }
        };

        fetchCommunityDetails();
    }, [payload]);

    const environmentDetails = {
        heatIndex: communityDetails.heatIndex,
        airQualityIndex: communityDetails.airQualityIndex,
        uvRadiationIndex: communityDetails.uvRadiationIndex,
        precipitationIndex: communityDetails.precipitationIndex
    };

    const crimeDetails = {
        seriousCrimeIndex: parseFloat((communityDetails.seriousCrimeIndex || 0).toFixed(2)),
        moderateCrimeIndex: parseFloat((communityDetails.moderateCrimeIndex || 0).toFixed(2)),
        criticalCrimeIndex: parseFloat((communityDetails.criticalCrimeIndex || 0).toFixed(2))
    };

    const cityDetails = {
        name: communityDetails.name,
        score: cityInfo.score
    };

    const toTitleCase = (str) => {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
    };

    const cityName = toTitleCase(cityInfo.iri?.split('#')[1].replace(/%20/g, ' ').toLowerCase() || "N/A");

  return (
    <div className="App">
      <div className="box">
        <Header />
        <div className="detials-content">
          <h1 className="text-3xl font-bold text-center mb-4">
            Statistics  (Recent Data from 2021-2022) of {cityName} Community
          </h1>
          <div className="metrics-container">
            <div className="section">
              <h2 className="text-2xl font-bold text-center mb-4">County Information</h2>
              <div className="metric-placement">
                {Object.entries(cityDetails).map(([key, value], index) => (
                    <Card key={index} className="card">
                        <Card.Body>
                            <Card.Title>{toTitleCase(key)}</Card.Title>
                            <Card.Text>{value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
              </div>
            </div>
            <div className="section">
              <h2 className="text-2xl font-bold text-center mb-4">Environment Metrics</h2>
              <div className="metric-placement">
                {Object.entries(environmentDetails).map(([key, value], index) => (
                    <Card key={index} className="card">
                        <Card.Body>
                            <Card.Title>{toTitleCase(key)}</Card.Title>
                            <Card.Text>{value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
              </div>
              <p className="text-center mt-4">Environment data is from National Environmental Public Health Tracking Network,&nbsp;
                <a className="hover:underline font-medium text-blue-600 underline" href="https://ephtracking.cdc.gov/DataExplorer/" 
                  target="_blank" rel="noopener noreferrer">Data Explorer
                </a>
              </p>
            </div>

            <div className="section">
              <h2 className="text-2xl font-bold text-center mb-4">Crime Metrics</h2>
              <div className="metric-placement">
              {Object.entries(crimeDetails).map(([key, value], index) => (
                    <Card key={index} className="card">
                        <Card.Body>
                            <Card.Title>{toTitleCase(key)}</Card.Title>
                            <Card.Text>{value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
              </div>
              <p className="text-center mt-4">Lower crime index is better.</p>
              <p className="text-center">Crime index ranges from 1 to 10.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
