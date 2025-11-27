import React, { useState } from 'react';
import axios from 'axios';

const ProductList = ({ products }) => {
  const [message, setMessage] = useState('');

  const handleAddToCart = async (product) => {
    try {
      await axios.post('http://localhost:8080/api/cart/add', {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price
      });
      setMessage(`✅ ${product.name} added to cart`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`❌ Failed to add ${product.name}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ₹{product.price}
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;