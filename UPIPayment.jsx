import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../utils/saveOrder";

const UPIPayment = ({ amount, onSuccess }) => {
  const navigate = useNavigate();
  const upiID = "hello@barista";
  const upiLink = `upi://pay?pa=${upiID}&pn=Hello%20Barista&am=${amount}&cu=INR`;

  const handleConfirm = () => {
    saveOrder("UPI", amount);
    if (onSuccess) onSuccess(); // ✅ Clear cart
    navigate("/confirmation");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Scan to Pay via UPI</h3>
      <QRCodeSVG value={upiLink} size={200} fgColor="#7b4f3d" />
      <p>
        UPI ID: <strong>{upiID}</strong>
      </p>
      <button
        onClick={handleConfirm}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#7b4f3d",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        I’ve Paid
      </button>
    </div>
  );
};

export default UPIPayment;