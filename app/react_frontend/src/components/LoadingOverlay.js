// src/components/LoadingOverlay.js
import React, { useContext } from 'react';
import { LoadingContext } from '../hooks/contexts/LoadingContext';
import { Spin } from 'antd';
// import './LoadingOverlay.css';  // Create this file
// import "../assets/css/LoadingOverlay.css";
import "../assets/css/LoadingOvelay.css";

const LoadingOverlay = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;
