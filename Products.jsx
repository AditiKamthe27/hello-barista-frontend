// import React, { useState, useContext } from "react";
// import { CartContext } from "../CartContext";

// const initialProducts = [
//   {
//     id: 1,
//     category: "Coffee Beans",
//     name: "Espresso Roast",
//     description: "Rich and bold flavor, perfect for espresso lovers.",
//     price: "₹950.99",
//     image: "https://tinyurl.com/y5a29zeh",
//     stock: 1000,
//   },
//   {
//     id: 2,
//     category: "Coffee Beans",
//     name: "Brew Blend",
//     description: "Smooth and refreshing, ideal for cold brews.",
//     price: "₹1100.99",
//     image: "https://shorturl.at/8aXf1",
//     stock: 150,
//   },
//   {
//     id: 3,
//     category: "Espresso Machines",
//     name: "Espresso Machines",
//     description: "High-quality espresso machine for home or café use.",
//     price: "₹227590.99",
//     image: "https://shorturl.at/rgXUu",
//     stock: 7,
//   },
//   {
//     id: 4,
//     category: "Coffee Grinders",
//     name: "Barista Grinder X",
//     description: "Adjustable grind size for perfect coffee every time.",
//     price: "₹7500.99",
//     image: "https://shorturl.at/iZby0",
//     stock: 0,
//   },
//   {
//     id: 5,
//     category: "Portafilter",
//     name: "Professional Portafilter",
//     description: "Durable stainless steel portafilter for espresso machines.",
//     price: "₹1200.99",
//     image: "https://shorturl.at/0HTbT",
//     stock: 100,
//   },
//   {
//     id: 6,
//     category: "Accessories",
//     name: "Milk Frothing Pitcher",
//     description: "Perfect for frothing milk for lattes and cappuccinos.",
//     price: "₹1750.99",
//     image: "https://shorturl.at/YGtXf",
//     stock: 89,
//   },
//   {
//     id: 7,
//     category: "Coffee Mug",
//     name: "Ceramic Coffee Mug",
//     description: "This charming coffee mug is perfect for adding a touch of warmth and joy to your daily coffee ritual.",
//     price: "₹189.99",
//     image: "https://shorturl.at/oTqGd",
//     stock: 47,
//   },
//   {
//     id: 8,
//     category: "Syrups",
//     name: "Coffee flavor shots",
//     description: "Coffee syrups are flavorful, sweetened liquid concentrates that add a rich and distinctive taste to coffee beverages.",
//     price: "₹10000.99",
//     image: "https://shorturl.at/eqmGp",
//     stock: 90,
//   },
//   {
//     id: 9,
//     category: "Refreshers",
//     name: "Essence Syrups",
//     description: "Syrups for iced teas and refreshers are flavorful liquid sweeteners that instantly elevate the taste of cold beverages.",
//     price: "₹1500.99",
//     image: "https://shorturl.at/C75P5",
//     stock: 65,
//   },
//   {
//     id: 10,
//     category: "Crushers",
//     name: "Fruit Fusion",
//     description: "Fruit crushers for smoothies are versatile kitchen appliances designed to efficiently crush and blend a variety of fruits and other ingredients into smooth, delicious beverages.",
//     price: "₹1500.99",
//     image: "https://shorturl.at/gq72q",
//     stock: 34,
//   },
//   {
//     id: 11,
//     category: "Coffee Measure",
//     name: "Coffee Scale with Timer",
//     description: "A coffee scale with timer ensures precise brewing by measuring both weight and time. Ideal for pour-over, espresso, and French press, it helps maintain the perfect coffee-to-water ratio. Compact, accurate, and easy to use..",
//     price: "₹5299.99",
//     image: "https://shorturl.at/64Ej4",
//     stock: 15,
//   },
//   {
//     id: 12,
//     category: "Puck Screen",
//     name: "PUCK SCREEN - 58.5mm",
//     description: "A puck screen is a stainless-steel filter placed over espresso grounds to ensure even water flow, reduce channeling, and deliver a cleaner, smoother shot.",
//     price: "₹1999.99",
//     image: "https://shorturl.at/1iooh",
//     stock: 100000,
//   },
//   {
//     id: 13,
//     category: "Dosing Funnel",
//     name: "DOCING RING  - 58.5mm , Silver",
//     description: "A dosing ring is a magnetic or slip-on collar that fits on your portafilter, preventing coffee grounds from spilling during dosing and distribution for a cleaner, more precise espresso prep.",
//     price: "₹1699.99",
//     image: "https://shorturl.at/RbVof",
//     stock: 1000,
//   },
//   {
//     id: 14,
//     category: "Coffee Distribution ",
//     name: "COFFEE DISTRIBUTOR - 58.5mm",
//     description: "Coffee distribution ensures even spread of grounds in the portafilter for consistent and balanced espresso extraction.",
//     price: "₹2299.99",
//     image: "https://cdn.shopify.com/s/files/1/2425/8607/files/artpresso-leveler-tamp-lifestyle-black-white_480x480.jpg?v=1664474164",
//     stock: 1000,
//   },
// ];

// const Products = () => {
//   const [products, setProducts] = useState(initialProducts);
//   const [quantities, setQuantities] = useState({});
//   const [addedCounts, setAddedCounts] = useState({});
//   const [message, setMessage] = useState("");
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const { addToCart } = useContext(CartContext);

//   const handleQuantityChange = (productId, value) => {
//     const qty = Math.max(1, parseInt(value) || 1);
//     setQuantities((prev) => ({ ...prev, [productId]: qty }));
//   };

//   const handleAddToCart = (product) => {
//     const quantity = quantities[product.id] || 1;
//     addToCart(product, quantity);

//     setAddedCounts((prev) => ({
//       ...prev,
//       [product.id]: (prev[product.id] || 0) + quantity,
//     }));

//     const updatedProducts = products.map((p) =>
//       p.id === product.id
//         ? { ...p, stock: Math.max(0, p.stock - quantity) }
//         : p
//     );
//     setProducts(updatedProducts);

//     setMessage(`✅ ${product.name} (x${quantity}) added to cart`);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   return (
//     <div style={styles.background}>
//       <div style={styles.contentWrapper}>
//         <h2>Our Products</h2>
//         <p>Explore our coffee products and accessories below.</p>
//         {message && <p style={styles.message}>{message}</p>}

//         <div style={styles.grid}>
//           {products.map((product) => {
//             const qty = quantities[product.id] || 1;
//             const outOfStock = product.stock === 0;
//             const isHovered = hoveredCard === product.id;

//             return (
//               <div
//                 key={product.id}
//                 style={{
//                   ...styles.card,
//                   transform: isHovered ? "scale(1.03)" : "scale(1)",
//                   boxShadow: isHovered
//                     ? "0 4px 12px rgba(0,0,0,0.15)"
//                     : "0 2px 8px rgba(0,0,0,0.1)",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 }}
//                 onMouseEnter={() => setHoveredCard(product.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <img src={product.image} alt={product.name} style={styles.image} />
//                 <h3>{product.name}</h3>
//                 <p style={styles.category}>{product.category}</p>
//                 <p>{product.description}</p>
//                 <p style={styles.price}>₹{String(product.price).replace(/[₹?$]/g, "")}</p>

//                 <div style={styles.quantityRow}>
//                   <button
//                     onClick={() => handleQuantityChange(product.id, qty - 1)}
//                     disabled={qty <= 1}
//                     style={{
//                       ...styles.qtyBtn,
//                       opacity: qty <= 1 ? 0.5 : 1,
//                       cursor: qty <= 1 ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     –
//                   </button>
//                   <span style={styles.qtyText}>{qty}</span>
//                   <button
//                     onClick={() => handleQuantityChange(product.id, qty + 1)}
//                     disabled={qty >= product.stock}
//                     style={{
//                       ...styles.qtyBtn,
//                       opacity: qty >= product.stock ? 0.5 : 1,
//                       cursor: qty >= product.stock ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={outOfStock}
//                   style={{
//                     ...styles.button,
//                     opacity: outOfStock ? 0.5 : 1,
//                     cursor: outOfStock ? "not-allowed" : "pointer",
//                   }}
//                 >
//                   {outOfStock ? "Out of Stock" : "Add to Cart"}
//                 </button>

//                 {addedCounts[product.id] && (
//                   <p style={styles.added}>Added: {addedCounts[product.id]}</p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   background: {
//     backgroundColor: "#4b2e2e",
//     minHeight: "100vh",
//     padding: "40px 20px",
//   },
//   contentWrapper: {
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     padding: "30px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   message: {
//     color: "#2f855a",
//     backgroundColor: "#f0fff4",
//     padding: "10px",
//     borderRadius: "5px",
//     marginTop: "10px",
//     fontWeight: "500",
//     maxWidth: "400px",
//     margin: "10px auto",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "24px",
//     marginTop: "30px",
//   },
//   card: {
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     padding: "20px",
//     backgroundColor: "#fff",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     transition: "transform 0.3s ease",
//   },
//   image: {
//     width: "100%",
//     height: "150px",
//     objectFit: "cover",
//     borderRadius: "5px",
//     marginBottom: "10px",
//   },
//   category: {
//     fontSize: "14px",
//     color: "#6b7280",
//     marginBottom: "5px",
//   },
//   price: {
//     fontWeight: "bold",
//     marginTop: "10px",
//     fontSize: "16px",
//   },
//   quantityRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     marginTop: "10px",
//   },
//   qtyBtn: {
//     padding: "6px 12px",
//     fontSize: "16px",
//     backgroundColor: "#e5e7eb",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   qtyText: {
//     fontSize: "14px",
//     fontWeight: "500",
//   },
//   button: {
//     marginTop: "10px",
//     padding: "8px 16px",
//     backgroundColor: "#4b2e2e",
//     color: "white",
//     border: "none",
//     borderRadius: "999px",
//     cursor: "pointer",
//     fontWeight: "500",
//   },
//   added: {
//     marginTop: "8px",
//     fontSize: "14px",
//     color: "#2563eb",
//     fontWeight: "500",
//   },
// };

// export default Products;



import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
        const initialQty = {};
        res.data.forEach((p) => {
          initialQty[p.id] = 1;
        });
        setQuantities(initialQty);
      })
      .catch(() => console.error("❌ Failed to load products"));
  }, []);

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    setMessage(`✅ ${product.name} (x${qty}) added to cart`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Shop Coffee Essentials</h2>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.grid}>
        {products.map((product) => {
          const outOfStock = !product.inStock;
          const qty = quantities[product.id] || 1;

          return (
            <div key={product.id} style={styles.card}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>
              <p style={styles.price}>₹{product.price}</p>

              <div style={styles.quantityRow}>
                <button
                  onClick={() => handleQuantityChange(product.id, qty - 1)}
                  disabled={outOfStock || qty <= 1}
                  style={styles.qtyBtn}
                >–</button>
                <span style={styles.qtyText}>{qty}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, qty + 1)}
                  disabled={outOfStock}
                  style={styles.qtyBtn}
                >+</button>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={outOfStock}
                style={{
                  ...styles.button,
                  backgroundColor: outOfStock ? "#ccc" : "#7b4f3d",
                  cursor: outOfStock ? "not-allowed" : "pointer",
                }}
              >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px 20px" },
  heading: { fontSize: "28px", marginBottom: "30px", color: "#3a1f1f" },
  message: { fontSize: "16px", color: "green", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  name: { fontSize: "18px", fontWeight: "600", marginBottom: "6px" },
  description: { fontSize: "14px", color: "#555", marginBottom: "8px" },
  price: { fontSize: "16px", fontWeight: "500", marginBottom: "12px" },
  quantityRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  qtyBtn: {
    backgroundColor: "#eee",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "16px",
  },
  qtyText: { fontSize: "16px", fontWeight: "500" },
  button: {
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: "600",
  },
};

export default Products;