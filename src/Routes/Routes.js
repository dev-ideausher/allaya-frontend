import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login';
import SubDeepDive from '../components/SubDeepDive/SubDeepDive';



function Pages() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/track" element={<SubDeepDive />} />
     
    </Routes>
   
  </Router>)
}

export default Pages