// // // src/App.jsx
// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import Banner from "./components/Banner";
// // import Home from "./components/Home";
// // import Products from "./components/Products";
// // import About from "./components/About";
// // import Cart from "./components/Cart";
// // import Shop from "./components/Shop";
// // import Checkout from "./components/Checkout"; // ✅ New import
// // import NotFound from "./components/NotFound";

// // const App = () => {
// //   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<><Banner /><Home /></>} />
// //         <Route path="/products" element={<Products />} />
// //         <Route path="/about" element={<About />} />
// //         <Route path="/cart" element={<Cart />} />
// //         {/* <Route path="/shop" element={<Shop selectedItems={[]} />} /> */}
// //         <Route path="/checkout" element={<Checkout />} /> {/* ✅ New route */}
// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./context/AuthContext";

// User Components
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Home from "./components/Home";
import Products from "./components/Products";
import About from "./components/About";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";   // ✅ Added
import NotFound from "./components/NotFound";

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import Admin from "./admin/Admin";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManager from "./admin/ProductManager";
import AdminOrders from "./admin/AdminOrders";
import ReviewModeration from "./admin/ReviewModeration";

// Route Guards
import AdminRoute from "./routes/AdminRoute";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<><Banner /><Home /></>} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Added */}

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><ProductManager /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/reviews" element={<AdminRoute><ReviewModeration /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
};

export default App;