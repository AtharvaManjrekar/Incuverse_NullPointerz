import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RetirementPlanning from './pages/RetirementPlanning';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planning" element={<RetirementPlanning />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
