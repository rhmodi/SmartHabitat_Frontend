import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Import pages
import React from 'react';
import { DetailsPage } from './pages/DetailsPage';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
const App= ()=> {
  return (
    
    <Router>
    <div className="app-container">
      <main>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/details" element={<DetailsPage/>}/>
        </Routes>
       
      </main>
    </div>
    </Router>
  
  );
}

export default App;
