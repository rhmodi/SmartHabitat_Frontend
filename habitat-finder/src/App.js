import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Import pages
import ResultsPage from './pages/ResultsPage';
import HomePage from './pages/HomePage';
import React from 'react';

const App= ()=> {
  return (
    
    <Router>
    <div className="app-container">
    
      <main>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
       
      </main>
    </div>
    </Router>
  
  );
}

export default App;
