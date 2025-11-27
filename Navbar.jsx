// src/components/Navbar.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { groupedItems } = useContext(CartContext);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  const totalItems = groupedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h1 style={styles.logo}>Hello Barista</h1>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>

      <div style={styles.right}>
        <Link to="/cart" style={styles.cart}>
          🛒 <span style={styles.badge}>{totalItems}</span>
        </Link>
        {user ? (
          <>
            <span style={styles.greeting}>Hi, {user.name}</span>
            <button style={styles.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#8d8177",
    color: "#3a1f1f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    margin: 0, // ✅ ensures no white space above
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    marginRight: "20px",
    color: "#3a1f1f",
  },
  link: {
    textDecoration: "none",
    color: "#3a1f1f",
    fontWeight: "500",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  cart: {
    position: "relative",
    textDecoration: "none",
    color: "#3a1f1f",
    fontSize: "18px",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    backgroundColor: "#d4a373",
    color: "#fff",
    borderRadius: "999px",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "600",
  },
  greeting: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#3a1f1f",
  },
  logout: {
    padding: "6px 12px",
    backgroundColor: "#d4a373",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

export default Navbar;