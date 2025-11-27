// // src/utils/saveOrder.js
// export const saveOrder = (method, amount) => {
//   const items = JSON.parse(localStorage.getItem("cartItems")) || [];
//   const order = {
//     id: Date.now(),
//     items,
//     amount,
//     method,
//     date: new Date().toLocaleString(),
//   };

//   const orders = JSON.parse(localStorage.getItem("orders")) || [];
//   orders.push(order);
//   localStorage.setItem("orders", JSON.stringify(orders));
//   localStorage.removeItem("cartItems");
// };

import axios from "axios";

export const saveOrder = async (userId, customer, method, amount, cartItems) => {
  const order = {
    userId,
    customer,
    method,
    amount,
    status: "Pending",
    timestamp: new Date().toISOString(),
    itemsJson: JSON.stringify(cartItems),
  };

  try {
    await axios.post("http://localhost:8080/api/orders", order);
    await axios.delete(`http://localhost:8080/api/cart/clear?userId=${userId}`);
    console.log("✅ Order saved and cart cleared");
  } catch (error) {
    console.error("❌ Order sync failed:", error);
  }
};