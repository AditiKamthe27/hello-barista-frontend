// // src/admin/ProductManager.jsx
// import React, { useState } from "react";

// const ProductManager = () => {
//   const [products, setProducts] = useState([
//     { id: 1, name: "Espresso Roast", price: "₹950.99" },
//     { id: 2, name: "Brew Blend", price: "₹1100.99" },
//   ]);
//   const [newName, setNewName] = useState("");
//   const [newPrice, setNewPrice] = useState("");

//   const handleDelete = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   const handleAdd = () => {
//     if (newName && newPrice) {
//       const newProduct = {
//         id: Date.now(),
//         name: newName,
//         price: newPrice,
//       };
//       setProducts([...products, newProduct]);
//       setNewName("");
//       setNewPrice("");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Manage Products</h2>

//       <div style={styles.form}>
//         <input
//           type="text"
//           placeholder="Product name"
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="Price"
//           value={newPrice}
//           onChange={(e) => setNewPrice(e.target.value)}
//           style={styles.input}
//         />
//         <button style={styles.add} onClick={handleAdd}>Add Product</button>
//       </div>

//       <ul style={styles.list}>
//         {products.map((product) => (
//           <li key={product.id} style={styles.item}>
//             <span>{product.name} – {product.price}</span>
//             <button style={styles.delete} onClick={() => handleDelete(product.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "40px 20px",
//   },
//   heading: {
//     fontSize: "24px",
//     marginBottom: "20px",
//     color: "#3a1f1f",
//   },
//   form: {
//     display: "flex",
//     gap: "12px",
//     marginBottom: "24px",
//     flexWrap: "wrap",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//     flex: "1",
//     minWidth: "180px",
//   },
//   add: {
//     backgroundColor: "#7b4f3d",
//     color: "#fff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//   },
//   item: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "12px",
//     backgroundColor: "#f6f6f6",
//     padding: "12px",
//     borderRadius: "8px",
//   },
//   delete: {
//     backgroundColor: "#a94442",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default ProductManager;


// //src->admin->Admin.jsx
// import React, { useState, useEffect } from "react";

// const ProductManager = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     image: "",
//     price: "",
//     stock: "",
//   });
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch(() => setMessage("❌ Failed to load products"));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAdd = async () => {
//     const payload = {
//       name: form.name,
//       description: form.description,
//       image: form.image,
//       price: parseFloat(form.price),
//       inStock: parseInt(form.stock) > 0,
//     };

//     const res = await fetch("http://localhost:8080/api/products/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       const added = await res.json();
//       setProducts((prev) => [...prev, added]);
//       setForm({ name: "", description: "", image: "", price: "", stock: "" });
//       setMessage(`✅ ${added.name} added successfully`);
//     } else {
//       setMessage("❌ Failed to add product");
//     }

//     setTimeout(() => setMessage(""), 3000);
//   };

//   const handleDelete = async (id) => {
//     const res = await fetch(`http://localhost:8080/api/products/delete/${id}`, {
//       method: "DELETE",
//     });

//     if (res.ok) {
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//       setMessage("✅ Product deleted");
//     } else {
//       setMessage("❌ Failed to delete product");
//     }

//     setTimeout(() => setMessage(""), 3000);
//   };

//   const markOutOfStock = async (id) => {
//     const res = await fetch(`http://localhost:8080/api/products/out-of-stock/${id}`, {
//       method: "PUT",
//     });

//     if (res.ok) {
//       const updated = await res.json();
//       setProducts((prev) =>
//         prev.map((p) => (p.id === id ? { ...p, inStock: updated.inStock } : p))
//       );
//       setMessage("⚠️ Product marked out of stock");
//     } else {
//       setMessage("❌ Failed to update stock");
//     }

//     setTimeout(() => setMessage(""), 3000);
//   };

//   const markInStock = async (id) => {
//     const res = await fetch(`http://localhost:8080/api/products/in-stock/${id}`, {
//       method: "PUT",
//     });

//     if (res.ok) {
//       const updated = await res.json();
//       setProducts((prev) =>
//         prev.map((p) => (p.id === id ? { ...p, inStock: updated.inStock } : p))
//       );
//       setMessage("✅ Product marked in stock");
//     } else {
//       setMessage("❌ Failed to update stock");
//     }

//     setTimeout(() => setMessage(""), 3000);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Manage Products</h2>
//       {message && <p style={styles.message}>{message}</p>}

//       <div style={styles.form}>
//         <input
//           name="name"
//           placeholder="Product name"
//           value={form.name}
//           onChange={handleChange}
//           style={styles.input}
//         />
//         <input
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           style={styles.input}
//         />
//         <input
//           name="image"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={handleChange}
//           style={styles.input}
//         />
//         <input
//           name="price"
//           placeholder="Price"
//           type="number"
//           value={form.price}
//           onChange={handleChange}
//           style={styles.input}
//         />
//         <input
//           name="stock"
//           placeholder="Stock quantity"
//           type="number"
//           value={form.stock}
//           onChange={handleChange}
//           style={styles.input}
//         />
//         <button onClick={handleAdd} style={styles.add}>Add Product</button>
//       </div>

//       <ul style={styles.list}>
//         {products.map((product) => (
//           <li key={product.id} style={styles.item}>
//             <div>
//               <strong>{product.name}</strong> – ₹{product.price}
//               <br />
//               <span>{product.inStock ? "✅ In Stock" : "❌ Out of Stock"}</span>
//             </div>
//             <div style={styles.actions}>
//               <button style={styles.outBtn} onClick={() => markOutOfStock(product.id)} disabled={!product.inStock}>
//                 Mark Out of Stock
//               </button>
//               <button style={styles.inBtn} onClick={() => markInStock(product.id)} disabled={product.inStock}>
//                 Mark In Stock
//               </button>
//               <button style={styles.delete} onClick={() => handleDelete(product.id)}>
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "40px 20px" },
//   heading: { fontSize: "24px", marginBottom: "20px", color: "#3a1f1f" },
//   message: {
//     backgroundColor: "#fef3c7",
//     color: "#92400e",
//     padding: "10px",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   form: { display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" },
//   input: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//     flex: "1",
//     minWidth: "180px",
//   },
//   add: {
//     backgroundColor: "#7b4f3d",
//     color: "#fff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   list: { listStyle: "none", padding: 0 },
//   item: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "12px",
//     backgroundColor: "#f6f6f6",
//     padding: "12px",
//     borderRadius: "8px",
//   },
//   actions: {
//     display: "flex",
//     gap: "10px",
//   },
//   outBtn: {
//     backgroundColor: "#f0ad4e",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   inBtn: {
//     backgroundColor: "#2f855a",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   delete: {
//     backgroundColor: "#a94442",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default ProductManager;

import React, { useState, useEffect } from "react";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setMessage("❌ Failed to load products"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      image: form.image,
      price: parseFloat(form.price),
      quantity: parseInt(form.stock),
    };

    const res = await fetch("http://localhost:8080/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const added = await res.json();
      setProducts((prev) => [...prev, added]);
      setForm({ name: "", description: "", image: "", price: "", stock: "" });
      setMessage(`✅ ${added.name} added successfully`);
    } else {
      setMessage("❌ Failed to add product");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  const updateQuantity = async (id, newQty) => {
    const res = await fetch(`http://localhost:8080/api/products/update-quantity/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseInt(newQty)),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: updated.quantity, inStock: updated.inStock } : p))
      );
      setMessage(`✅ Updated quantity for ${updated.name}`);
    } else {
      setMessage("❌ Failed to update quantity");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Products</h2>
      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.grid}>
        <div style={styles.form}>
          <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} style={styles.input} />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={styles.input} />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={styles.input} />
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} style={styles.input} />
          <input name="stock" placeholder="Stock quantity" type="number" value={form.stock} onChange={handleChange} style={styles.input} />
          <button onClick={handleAdd} style={styles.add}>Add Product</button>
        </div>

        <div style={styles.productList}>
          {products.map((product) => {
            const isLowStock = product.quantity <= 5;
            return (
              <div key={product.id} style={{ ...styles.card, border: isLowStock ? "2px solid #e53e3e" : "none" }}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <div style={styles.details}>
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <p>{product.description}</p>
                  <p style={{ color: product.inStock ? "#2f855a" : "#a94442" }}>
                    {product.inStock ? "✅ In Stock" : "❌ Out of Stock"} ({product.quantity})
                  </p>
                  {isLowStock && (
                    <p style={styles.lowStock}>⚠️ Low stock! Consider adding more quantity.</p>
                  )}
                  <div style={styles.quantityEditor}>
                    <input
                      type="number"
                      min="0"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, e.target.value)}
                      style={styles.quantityInput}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px 20px", fontFamily: "sans-serif" },
  heading: { fontSize: "24px", marginBottom: "20px", color: "#3a1f1f" },
  message: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: "500",
    textAlign: "center",
  },
  grid: { display: "flex", gap: "40px", flexWrap: "wrap" },
  form: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  add: {
    backgroundColor: "#7b4f3d",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  productList: { flex: "2", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: "10px",
    padding: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  details: {
    flex: "1",
  },
  lowStock: {
    backgroundColor: "#fff5f5",
    color: "#c53030",
    padding: "6px",
    borderRadius: "6px",
    fontWeight: "500",
    marginTop: "8px",
  },
  quantityEditor: {
    marginTop: "10px",
  },
  quantityInput: {
    width: "100%",
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};

export default ProductManager;