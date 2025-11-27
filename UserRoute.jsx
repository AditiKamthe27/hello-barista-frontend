// src/routes/UserRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { role } = useAuth();
  return role === "user" ? children : <Navigate to="/admin/dashboard" />;
};

export default UserRoute;