import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // User not logged in
    return <Navigate to="/login" replace />;
  } else if (!allowedRoles.includes(userInfo.role)) {
    // User does not have any of the right roles
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
