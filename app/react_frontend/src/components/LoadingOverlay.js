// src/components/LoadingOverlay.js
import React, { useContext } from "react";
// import { LoadingContext } from '../hooks/contexts/LoadingContext';
import { Spin } from "antd";
// import './LoadingOverlay.css';  // Create this file
// import "../assets/css/LoadingOverlay.css";
import "../assets/css/LoadingOvelay.css";
import { useSelector } from "react-redux";

const LoadingOverlay = () => {
  // const { isLoading } = useContext(LoadingContext);
  const loading = useSelector((state) => state.generic.loading);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;
