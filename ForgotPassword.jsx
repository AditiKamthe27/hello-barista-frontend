import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

    if (index === -1) {
      setMessage("❌ Email not found.");
      return;
    }

    users[index].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("✅ Password updated successfully.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleReset} style={styles.form}>
          <input
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Update Password</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#fdf6f0",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: "360px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#4b2e2e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4b2e2e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  message: {
    marginTop: "12px",
    fontWeight: "500",
    color: "#2563eb",
  },
};

export default ForgotPassword;