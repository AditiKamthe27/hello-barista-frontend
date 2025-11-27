import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";
import { placeOrder } from "../api/coffeeApi";
import UPIPayment from "./UPIPayment";
import PaymentButton from "./PaymentButton";
import CODConfirmation from "./CODConfirmation";

const Checkout = () => {
  const [summary, setSummary] = useState([]);
  const [method, setMethod] = useState("upi");
  const { clearCart } = useContext(CartContext);

  const getSafePrice = (value) => {
    if (value == null) return 0;
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const cleaned = value.replace(/[₹$]/g, "").trim();
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const grouped = items.reduce((acc, item) => {
      const existing = acc.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    setSummary(grouped);
  }, []);

  const total = summary
    .reduce((sum, item) => {
      const price = getSafePrice(item.price);
      return sum + price * item.quantity;
    }, 0)
    .toFixed(2);

  const handleCheckoutComplete = () => {
    if (summary.length === 0) return;

    const items = summary.map((item) => ({
      name: item.name,
      price: getSafePrice(item.price),
      quantity: item.quantity,
    }));

    const order = {
      userId: 2,
      customer: "Aditi",
      method: method,
      status: "Pending",
      itemsJson: items, // ✅ send as array
    };

    placeOrder(order)
      .then((res) => {
        console.log("✅ Order placed:", res.data);
        localStorage.removeItem("cartItems"); // ✅ clear localStorage
        clearCart(); // ✅ clear context
        setSummary([]); // ✅ reset state
      })
      .catch((err) => {
        console.error("❌ Failed to place order:", err);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Checkout Summary</h2>
      {summary.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={styles.summaryGrid}>
            {summary.map((item) => {
              const price = getSafePrice(item.price);
              const subtotal = (price * item.quantity).toFixed(2);
              return (
                <div key={item.id} style={styles.itemCard}>
                  <img src={item.image} alt={item.name} style={styles.image} />
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{price.toFixed(2)}</p>
                  <p>Total: ₹{subtotal}</p>
                </div>
              );
            })}
          </div>

          <h3 style={styles.total}>Grand Total: ₹{total}</h3>

          <div style={styles.methodSelector}>
            <button onClick={() => setMethod("upi")} style={styles.methodBtn}>UPI</button>
            <button onClick={() => setMethod("card")} style={styles.methodBtn}>Card</button>
            <button onClick={() => setMethod("cod")} style={styles.methodBtn}>Cash on Delivery</button>
          </div>

          <div style={styles.paymentSection}>
            {method === "upi" && <UPIPayment amount={total} onSuccess={handleCheckoutComplete} />}
            {method === "card" && <PaymentButton amount={total} onSuccess={handleCheckoutComplete} />}
            {method === "cod" && <CODConfirmation amount={total} onSuccess={handleCheckoutComplete} />}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "80px", padding: "20px" },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  itemCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  total: { marginTop: "30px", fontSize: "20px", fontWeight: "bold" },
  methodSelector: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  methodBtn: {
    padding: "10px 20px",
    backgroundColor: "#7b4f3d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  paymentSection: { marginTop: "30px" },
};

export default Checkout;