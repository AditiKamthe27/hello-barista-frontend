//src->admin->Admin.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Admin = () => {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [isAdmin, navigate]);

  return <AdminDashboard />;
};

export default Admin;