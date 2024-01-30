import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Adminprotected() {
    const { currentUser } = useSelector((state) => state.user);
    
  return currentUser&&currentUser.data.isAdmin ? <Outlet /> : <Navigate to="/signin" />;
  
}

export default Adminprotected
