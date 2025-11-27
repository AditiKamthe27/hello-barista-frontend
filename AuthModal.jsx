//src/components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(true); // immediate open
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      setMessage("⚠️ Email already registered.");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("✅ Registered successfully!");
    setTimeout(() => {
      setIsLogin(true);
      setForm({ name: "", email: "", password: "" });
      setMessage("");
    }, 1500);
  };

  const handleLogin = (e) => {
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
      setTimeout(() => {
        setIsOpen(false);
        onClose();
        navigate("/products");
      }, 1500);
    } else {
      setMessage("❌ Invalid credentials.");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
    setMessage("");
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister} style={styles.form}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}
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
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <p style={styles.toggle}>
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span onClick={toggleMode} style={styles.link}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#4b2e2e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4b2e2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontWeight: "500",
    color: "#2563eb",
  },
  toggle: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#d97706",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default AuthModal;