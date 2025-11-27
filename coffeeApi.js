import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// 🛍️ Product APIs
export const getProducts = () => axios.get(`${BASE_URL}/products`);

// 🛒 Cart APIs
export const getCartItems = () => axios.get(`${BASE_URL}/cart`);
export const addToCart = (item) => axios.post(`${BASE_URL}/cart/add`, item);
export const removeFromCart = (id) => axios.delete(`${BASE_URL}/cart/remove/${id}`);
export const checkoutCart = () => axios.post(`${BASE_URL}/cart/checkout`);
export const clearCart = (userId) => axios.delete(`${BASE_URL}/cart/clear?userId=${userId}`);

// 📦 Order APIs
export const placeOrder = (order) => axios.post(`${BASE_URL}/orders`, order); // ✅ matches backend
export const getOrders = () => axios.get(`${BASE_URL}/orders`); // ✅ admin fetches all
export const getUserOrders = (userId) => axios.get(`${BASE_URL}/orders`, { params: { userId } }); // ✅ user-specific
export const markOrderDelivered = (id) =>
  axios.put(`${BASE_URL}/orders/status`, null, { params: { id, status: 'Delivered' } }); // ✅ matches controller

// 📊 Admin Analytics APIs
export const getOrderSummary = () => axios.get(`${BASE_URL}/orders/summary`);
export const getSellByDay = () => axios.get(`${BASE_URL}/orders/sell-by-day`);
export const getSellByProduct = () => axios.get(`${BASE_URL}/orders/sell-by-product`);
export const getSellByMethod = () => axios.get(`${BASE_URL}/orders/sell-by-method`);