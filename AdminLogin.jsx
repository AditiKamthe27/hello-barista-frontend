// src/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Hardcoded credentials (replace with backend later)
    if (username === "admin" && password === "barista123") {
      localStorage.setItem("isAdmin", true);
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#3a1f1f",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "320px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#d4a373",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    color: "#a94442",
    marginTop: "10px",
  },
};

export default AdminLogin;