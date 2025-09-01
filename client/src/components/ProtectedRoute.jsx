import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isVerified } = useSelector((state) => state.user);

  // If user is not verified, redirect to /sign-up or wherever OTP verification happens
  if (!isVerified) {
    return <Navigate to="/sign-up" />;
  }

  return children;
};

export default ProtectedRoute;
