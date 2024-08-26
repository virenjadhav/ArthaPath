// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
import { AuthContext } from '../hooks/contexts/AuthContext.js';

const ProtectedRoute = () => {
  const { authState, logout } = useContext(AuthContext);

  if (!authState.isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProtectedRoute;
