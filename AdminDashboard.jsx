// // src/admin/AdminDashboard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     navigate("/");
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Admin Dashboard</h2>

//       <div style={styles.grid}>
//         <button style={styles.card} onClick={() => navigate("/admin/products")}>
//           Manage Products
//         </button>
//         <button style={styles.card} onClick={() => navigate("/admin/orders")}>
//           View Orders
//         </button>
//         <button style={styles.card} onClick={() => navigate("/admin/reviews")}>
//           Moderate Reviews
//         </button>
//       </div>

//       <button style={styles.logout} onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "40px 20px",
//     textAlign: "center",
//   },
//   heading: {
//     fontSize: "28px",
//     marginBottom: "30px",
//     color: "#3a1f1f",
//   },
//   grid: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "30px",
//     flexWrap: "wrap",
//     marginBottom: "40px",
//   },
//   card: {
//     padding: "20px 30px",
//     backgroundColor: "#d4a373",
//     color: "#fff",
//     border: "none",
//     borderRadius: "12px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     transition: "transform 0.2s ease",
//   },
//   logout: {
//     padding: "10px 20px",
//     backgroundColor: "#a94442",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//   },
// };

// export default AdminDashboard;



//src->admin->AdminDashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { clearRole } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); // ✅ No reload, context stays intact
  };

  const handleLogout = () => {
    clearRole();
    navigate("/admin-login");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <div style={styles.grid}>
        <button style={styles.card} onClick={() => handleNavigate("/admin/products")}>
          🛍️ Manage Products
        </button>
        <button style={styles.card} onClick={() => handleNavigate("/admin/orders")}>
          📦 View Orders
        </button>
        <button style={styles.card} onClick={() => handleNavigate("/admin/reviews")}>
          📝 Moderate Reviews
        </button>
      </div>
      <button style={styles.logout} onClick={handleLogout}>
        🔒 Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "40px",
    color: "#3a1f1f",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#f5e8dc",
    border: "none",
    padding: "18px 24px",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  logout: {
    backgroundColor: "#a94442",
    color: "#fff",
    border: "none",
    padding: "14px 20px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

export default AdminDashboard;