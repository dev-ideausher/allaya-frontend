import React from "react"
import { Route, Navigate , Outlet } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
import useToken from "./UseTocke";

export default function PrivateRoute({ children }) {
    
    const auth = useToken(); // determine if authorized, from context or however you're doing it
    console.log('auth' , auth);

    

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? children : <Navigate to="/login" />
    
    
  
}

