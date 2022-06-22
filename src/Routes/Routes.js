import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login';
import SubDeepDive from '../components/SubDeepDive/SubDeepDive';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoutes';


function Pages() {

 
  return (
    <Router>
    <AuthProvider>
    <Routes>
      <Route exact path='/' element={<PrivateRoute/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </AuthProvider>
   
  </Router>)
}

export default Pages