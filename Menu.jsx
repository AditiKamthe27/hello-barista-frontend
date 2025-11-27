import React, { useEffect, useState } from "react";
import { getProducts, addToCart, getCartItems } from "../api/coffeeApi";

const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleAdd = (item) => {
    addToCart({
      productId: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      quantity: 1,
    }).then(() => {
      getCartItems().then((res) => {
        localStorage.setItem("cartItems", JSON.stringify(res.data));
        alert(`${item.name} added to cart`);
      });
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Our Coffee Menu</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>₹{item.price}</p>
            <button onClick={() => handleAdd(item)} style={{ padding: "10px 20px", backgroundColor: "#7b4f3d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;