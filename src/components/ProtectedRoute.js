import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const loginData = useSelector((state) => state.auth.loginData);

  if (!loginData) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children components (the protected page)
  return children;
};

export default ProtectedRoute;
