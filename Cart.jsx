// // src/components/Cart.jsx
// import React, { useEffect, useState } from "react";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load cart items from localStorage
//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedItems);
//   }, []);

//   // Remove item by index
//   const handleRemove = (indexToRemove) => {
//     const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
//     localStorage.setItem("cartItems", JSON.stringify(updatedItems));
//     setCartItems(updatedItems);
//   };

//   // Checkout: clear cart and show confirmation
//   const handleCheckout = () => {
//     localStorage.removeItem("cartItems");
//     setCartItems([]);
//     alert("Thank you for your visit!");
//   };

//   // Calculate total price
//  const total = cartItems.reduce((sum, item) => {
//   const rawPrice = item?.price ?? "0";
//   const price = parseFloat(rawPrice.replace(/[₹$]/g, "")) || 0;
//   return sum + price;
// }, 0).toFixed(2);

//   return (
//     <div style={styles.container}>
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>No items selected yet.</p>
//       ) : (
//         <div style={styles.cartItems}>
//           {cartItems.map((item, index) => (
//             <div key={index} style={styles.cartItem}>
//               <span>{item.name}</span>
//               <span>{item.price}</span>
//               <button onClick={() => handleRemove(index)} style={styles.remove}>
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <h3 style={styles.total}>Total: ₹{total}</h3>
//       <button onClick={handleCheckout} style={styles.checkout}>
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     marginTop: "120px",
//     padding: "20px",
//   },
//   cartItems: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     marginTop: "20px",
//     maxWidth: "400px",
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
//   cartItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 15px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     backgroundColor: "#fafafa",
//   },
//   total: {
//     marginTop: "20px",
//   },
//   checkout: {
//     marginTop: "10px",
//     padding: "10px 25px",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "#2563eb",
//     color: "white",
//     cursor: "pointer",
//   },
//   remove: {
//     marginLeft: "10px",
//     padding: "5px 10px",
//     backgroundColor: "#ef4444",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default Cart;



// src/components/Cart.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const Cart = () => {
  const {
    cartItems,
    groupedItems,
    setCartItems,
    clearCart,
  } = useContext(CartContext);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const updateCartStorage = (grouped) => {
    const flatList = [];
    grouped.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        flatList.push(item);
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(flatList));
    setCartItems(flatList);
  };

  const handleQuantityChange = (key, delta) => {
    const updated = groupedItems.map((item) => {
      if (item.id === key) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCartStorage(updated);
  };

  const handleRemove = (keyToRemove) => {
    const updated = cartItems.filter((item) => item.id !== keyToRemove);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    setCartItems(updated);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const getSafePrice = (value) => {
    if (value == null) return 0;
    return typeof value === "string"
      ? parseFloat(value.replace(/[₹$]/g, "")) || 0
      : Number(value) || 0;
  };

  const total = groupedItems.reduce((sum, item) => {
    const price = getSafePrice(item.price);
    return sum + price * item.quantity;
  }, 0).toFixed(2);

  return (
    <div style={styles.background}>
      <div style={styles.centerWrapper}>
        <div style={styles.blurLayer}>
          <h2>Your Cart</h2>
          {message && <p style={styles.message}>{message}</p>}

          {groupedItems.length === 0 ? (
            <p style={styles.empty}>🛒 No items selected yet.</p>
          ) : (
            <div style={styles.grid}>
              <div style={styles.cartItems}>
                {groupedItems.map((item, index) => {
                  const price = getSafePrice(item.price);
                  const subtotal = (price * item.quantity).toFixed(2);
                  return (
                    <div key={index} style={styles.cartItem}>
                      <img src={item.image} alt={item.name} style={styles.image} />
                      <div style={styles.details}>
                        <h4 style={styles.name}>{item.name}</h4>
                        <p style={styles.price}>Price: ₹{price.toFixed(2)}</p>
                        <div style={styles.quantityRow}>
                          <button onClick={() => handleQuantityChange(item.id, -1)} style={styles.qtyBtn}>–</button>
                          <span style={styles.qtyText}>{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)} style={styles.qtyBtn}>+</button>
                        </div>
                        <p style={styles.subtotal}>Subtotal: ₹{subtotal}</p>
                      </div>
                      <button onClick={() => handleRemove(item.id)} style={styles.remove}>Remove</button>
                    </div>
                  );
                })}
              </div>

              <div style={styles.summary}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                <p style={styles.summaryTotal}>Total: ₹{total}</p>
                <button onClick={handleCheckout} style={styles.checkout}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
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
  centerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
  },
  blurLayer: {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  message: {
    backgroundColor: "#f0fff4",
    color: "#2f855a",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: "500",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  empty: {
    fontSize: "18px",
    color: "#6b7280",
    marginTop: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    marginTop: "30px",
    alignItems: "start",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px",
  },
  details: {
    flex: 1,
    textAlign: "left",
  },
  name: {
    margin: "0 0 5px",
    fontSize: "16px",
    fontWeight: "600",
  },
  price: {
    margin: 0,
    fontSize: "14px",
    color: "#4b2e2e",
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "8px 0",
  },
  qtyBtn: {
    padding: "4px 10px",
    fontSize: "16px",
    backgroundColor: "#e5e7eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  qtyText: {
    fontSize: "14px",
    fontWeight: "500",
  },
  subtotal: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "500",
  },
  remove: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
  },
  summary: {
    position: "sticky",
    top: "100px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    height: "fit-content",
    textAlign: "left",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#4b2e2e",
  },
  summaryTotal: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "20px",
  },
  checkout: {
    padding: "10px 25px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#4b2e2e",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Cart;