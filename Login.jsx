import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === form.email.toLowerCase() &&
        u.password === form.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/products"), 1500);
    } else {
      setMessage("❌ Invalid credentials.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>

          {/* ✅ Forgot Password Link */}
          <p style={styles.forgot}>
            <span
              onClick={() => navigate("/forgot-password")}
              style={styles.link}
            >
              Forgot Password?
            </span>
          </p>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        {/* ✅ Register Link */}
        <p style={styles.toggle}>
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            style={styles.link}
          >
            Register
          </span>
        </p>
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
    backgroundColor: "#fdf6f0", // soft cream
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
    color: "#4b2e2e", // espresso
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
    transition: "background-color 0.3s ease",
  },
  forgot: {
    marginTop: "12px",
    fontSize: "14px",
  },
  toggle: {
    marginTop: "16px",
    fontSize: "14px",
  },
  link: {
    color: "#d97706",
    cursor: "pointer",
    fontWeight: "500",
  },
  message: {
    marginTop: "12px",
    fontWeight: "500",
    color: "#2563eb",
  },
};

export default Login;