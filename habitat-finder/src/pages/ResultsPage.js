import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const ResultsPage = () => {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("Metrics"));
    if (storedResults) {
      setResult(storedResults);
    }
  }, []);

  const handleViewDetails = async (item) => {
    const payload = {
      IRI: item.iri,
      name: item.name,
      seriousCrimeIndex: parseFloat((item.seriousCrimeIndex || 0).toFixed(2)),
      moderateCrimeIndex: parseFloat((item.moderateCrimeIndex || 0).toFixed(2)),
      criticalCrimeIndex: parseFloat((item.criticalCrimeIndex || 0).toFixed(2)),
      airQualityIndex: item.airQualityIndex || 0,
      heatIndex: item.heatIndex || 0,
      uvRadiationIndex: item.uvRadiationIndex || 0,
      precipitationIndex: item.precipitationIndex || 0
    };

    try {
      const data = await apiService.getCommunityDetails(payload);
      navigate('/details', { state: { communityDetails: data, cityInfo: { iri: item.iri, score: item.score.toFixed(2) } } });
    } catch (error) {
      console.error("Error fetching community details:", error);
    }
  };

  return (
    <div className="App">
      <div className="box">
        <Header />
        <br></br>
        <h1 className="font-bold title">
          Best Communities For You ✨ :- {result[0]?.iri.split('#')[1].replace(/%20/g, ' ') || "N/A"}
        </h1>
        <br></br>
        <br></br>
        <h2 className="font-bold text-purple-500 subtitle">
          Top 5 Communities and Neighborhoods for you:
        </h2>
        <br></br>
        <table className="table-auto border-collapse border border-gray-300 w-3/4 mx-auto shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                Community
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                Score
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.iri.split('#')[1].replace(/%20/g, ' ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.score.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-blue-500">
                  <Link
                    onClick={() => handleViewDetails(item)}
                    className="hover:underline font-medium"
                  >
                    View Detailed Stats
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;
