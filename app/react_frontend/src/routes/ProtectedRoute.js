// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const logged_in = useSelector((state) => state.generic.logged_in);

  return logged_in ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
