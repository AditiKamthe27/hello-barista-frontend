// src/components/Confirmation.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length > 0) {
      setLatestOrder(orders[orders.length - 1]);
    }
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.blurLayer}>
        <h2 style={styles.heading}>🎉 Thank You for Your Order!</h2>
        <p style={styles.subtext}>Your coffee journey begins now.</p>

        {latestOrder ? (
          <div style={styles.details}>
            <p><strong>Order ID:</strong> {latestOrder.id}</p>
            <p><strong>Amount Paid:</strong> ₹{latestOrder.amount}</p>
            <p><strong>Payment Method:</strong> {latestOrder.method}</p>
            <p><strong>Date:</strong> {latestOrder.date}</p>
          </div>
        ) : (
          <p style={styles.empty}>No recent order found.</p>
        )}

        <button style={styles.button} onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: 'url("https://thumbs.dreamstime.com/b/coffee-background-space-text-85121087.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  blurLayer: {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#4b2e2e",
  },
  subtext: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#5a3e36",
  },
  details: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  empty: {
    fontSize: "14px",
    fontStyle: "italic",
    color: "#6b7280",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 25px",
    backgroundColor: "#4b2e2e",
    color: "white",
    border: "none",
    borderRadius: "999px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Confirmation;