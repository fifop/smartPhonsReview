import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  } else if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(userInfo?.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};


export default ProtectedRoute;

