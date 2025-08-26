import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true";
  const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

  if (!isLoggedIn) {
    return <Navigate to="/dang-nhap" replace />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/trang-chu-da-dang-nhap" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
