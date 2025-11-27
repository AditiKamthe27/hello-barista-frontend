// // src/CartContext.jsx
// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(stored);
//   }, []);

//   const addToCart = (product, quantity = 1) => {
//     const updated = [...cartItems];
//     for (let i = 0; i < quantity; i++) {
//       updated.push(product);
//     }
//     localStorage.setItem("cartItems", JSON.stringify(updated));
//     setCartItems(updated);
//   };

//   const removeFromCart = (productId) => {
//     const updated = cartItems.filter((item) => item.id !== productId);
//     localStorage.setItem("cartItems", JSON.stringify(updated));
//     setCartItems(updated);
//   };

//   const clearCart = () => {
//     localStorage.removeItem("cartItems");
//     setCartItems([]);
//   };

//   const groupItems = (items) => {
//     const grouped = {};
//     items.forEach((item) => {
//       const key = item.id;
//       if (!grouped[key]) {
//         grouped[key] = { ...item, quantity: 1 };
//       } else {
//         grouped[key].quantity += 1;
//       }
//     });
//     return Object.values(grouped);
//   };

//   const groupedItems = groupItems(cartItems);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         groupedItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         setCartItems,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Validate each item before setting state
  const isValidItem = (item) =>
    item &&
    typeof item.id !== "undefined" &&
    (typeof item.price === "number" || typeof item.price === "string");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    const filtered = stored.filter(isValidItem);
    setCartItems(filtered);

    // ✅ Log any invalid items for debugging
    const invalid = stored.filter((item) => !isValidItem(item));
    if (invalid.length > 0) {
      console.warn("⚠️ Invalid cart items removed:", invalid);
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    const updated = [...cartItems];
    for (let i = 0; i < quantity; i++) {
      updated.push(product);
    }
    localStorage.setItem("cartItems", JSON.stringify(updated));
    setCartItems(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    setCartItems(updated);
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const groupItems = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const key = item.id;
      if (!grouped[key]) {
        grouped[key] = { ...item, quantity: 1 };
      } else {
        grouped[key].quantity += 1;
      }
    });
    return Object.values(grouped);
  };

  const groupedItems = groupItems(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        groupedItems,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};