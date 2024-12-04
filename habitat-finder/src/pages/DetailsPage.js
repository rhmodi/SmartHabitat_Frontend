import React from "react";
import Card from 'react-bootstrap/Card';
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export const DetailsPage = () => {
    const location = useLocation();
    const { communityDetails, cityInfo } = location.state || {};

    const environmentDetails = {
        heatIndex: communityDetails?.heatIndex,
        airQualityIndex: communityDetails?.airQualityIndex,
        uvRadiationIndex: communityDetails?.uvRadiationIndex,
        precipitationIndex: communityDetails?.precipitationIndex
    };

    const crimeDetails = {
        criticalCrimeIndex: parseFloat((communityDetails?.criticalCrimeIndex || 0).toFixed(2)),
        seriousCrimeIndex: parseFloat((communityDetails?.seriousCrimeIndex || 0).toFixed(2)),
        moderateCrimeIndex: parseFloat((communityDetails?.moderateCrimeIndex || 0).toFixed(2))
    };

    const cityDetails = {
        name: communityDetails?.name,
        score: cityInfo?.score
    };

    const toTitleCase = (str) => {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
    };

    const cityName = toTitleCase(cityInfo?.iri?.split('#')[1].replace(/%20/g, ' ').toLowerCase() || "N/A");

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
