import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { role } = useAuth();
  return role === "admin" ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;