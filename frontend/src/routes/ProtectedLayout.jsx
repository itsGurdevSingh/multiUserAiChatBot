import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { isAuthenticated, loading,loginError,registerError,sessionError } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // or spinner
  }
  
  if(registerError) {
    return <Navigate to="/register" replace />;
  }

  if (!isAuthenticated || loginError || sessionError) {
    return <Navigate to="/login" replace />;
  }

  


  return <Outlet />; // 👈 renders child routes if authenticated
};

export default ProtectedLayout;
