// src/admin/AdminLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>Admin Panel</h2>
        <nav style={styles.nav}>
          <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/admin/products" style={styles.link}>Products</Link>
          <Link to="/admin/orders" style={styles.link}>Orders</Link>
          <Link to="/admin/reviews" style={styles.link}>Reviews</Link>
        </nav>
      </aside>
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#3a1f1f",
    color: "#fff",
    padding: "30px 20px",
  },
  title: {
    fontSize: "20px",
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
  },
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f9f9f9",
  },
};

export default AdminLayout;