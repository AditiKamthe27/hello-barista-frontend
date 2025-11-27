import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "120px",
    padding: "40px",
  },
  heading: {
    fontSize: "48px",
    color: "#ef4444",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  link: {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default NotFound;