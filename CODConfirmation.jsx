import React from "react";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../utils/saveOrder";

const CODConfirmation = ({ amount, onSuccess }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    saveOrder("Cash on Delivery", amount);
    if (onSuccess) onSuccess(); // ✅ Clear cart
    navigate("/confirmation");
  };

  return (
    <div style={styles.container}>
      <p style={styles.amount}>Amount: ₹{amount}</p>
      <button onClick={handleConfirm} style={styles.button}>
        Confirm COD Order
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "20px",
    textAlign: "center",
  },
  amount: {
    fontSize: "18px",
    marginBottom: "12px",
    fontWeight: "500",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#7b4f3d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

export default CODConfirmation;