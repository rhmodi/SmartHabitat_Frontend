import Header from "../components/Header";
// import Dropdown from '../components/Dropdown';
import React from "react";
import { Link } from "react-router-dom";

const ResultsPage = () => {
  const result = [
    { city: "Phoenix", county: "Maricopa" },
    { city: "Tucson", county: "Pima" },
    { city: "Flagstaff", county: "Coconino" },
    { city: "Mesa", county: "Maricopa" },
    { city: "Scottsdale", county: "Maricopa" },
  ];

  return (
    <div className="App">
      <div className="box">
        <Header />
        <br></br>
        <h1 className="font-bold title">
          BEST CITY FOR YOU ✨ :- {result[0].city}
        </h1>
        <br></br>
        <br></br>
        <h2 className="font-bold text-purple-500 subtitle">
          Top 5 Cities and Neighborhoods for you:
        </h2>
        <br></br>
        <table className="table-auto border-collapse border border-gray-300 w-3/4 mx-auto shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                City
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                County/Neighborhood
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                Actions
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
                  {item.city}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.county}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-blue-500">
                  <Link
                    to="/details"
                    onClick={()=>{
                      const cityInfo = [{
                        "city":item.city,
                        "county":item.county
                      }];
                      localStorage.setItem("Metrics",JSON.stringify(cityInfo));
                    }}
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
