import React from "react";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../utils/saveOrder";

const PaymentButton = ({ amount, order, clearCart }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: amount * 100,
      currency: "INR",
      name: "Hello Barista",
      description: "Order Payment",
      handler: function () {
        saveOrder({ ...order, method: "Card", amount }, clearCart);
        navigate("/confirmation");
      },
      prefill: {
        name: "Aditi",
        email: "aditi@example.com",
        contact: "9999999999",
      },
      theme: { color: "#7b4f3d" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} style={buttonStyle}>
      Pay ₹{amount}
    </button>
  );
};

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#7b4f3d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

export default PaymentButton;