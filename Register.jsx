// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "100px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "0 auto" },
};

export default Register;