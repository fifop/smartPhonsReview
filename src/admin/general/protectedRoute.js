import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // User not logged in
    return <Navigate to="/login" replace />;
  } else if (userInfo.role !== allowedRole) {
    // User does not have the right role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;