// // src/admin/AdminOrders.jsx
// import React, { useEffect, useState } from "react";
// import { getOrders } from "../api/coffeeApi";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     getOrders()
//       .then((res) => setOrders(res.data))
//       .catch(() => setMessage("❌ Failed to load orders"));
//   }, []);

//   const parseItems = (json) => {
//     try {
//       const items = JSON.parse(json);
//       return items.map((item, index) => (
//         <li key={index}>
//           {item.name} × {item.quantity || 1}
//         </li>
//       ));
//     } catch {
//       return <li>Invalid item data</li>;
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>All Orders</h2>
//       {message && <p style={styles.message}>{message}</p>}
//       {orders.length === 0 ? (
//         <p style={styles.empty}>No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} style={styles.card}>
//             <p><strong>Order ID:</strong> {order.orderId}</p>
//             <p><strong>Customer:</strong> {order.customer}</p>
//             <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
//             <p><strong>Status:</strong> {order.paymentStatus}</p>
//             <p><strong>Method:</strong> {order.paymentMethod}</p>
//             <p><strong>Time:</strong> {new Date(order.timestamp).toLocaleString()}</p>
//             <p><strong>Items:</strong></p>
//             <ul style={styles.itemList}>{parseItems(order.itemsJson)}</ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "40px 20px",
//     maxWidth: "1000px",
//     margin: "0 auto",
//   },
//   heading: {
//     fontSize: "24px",
//     marginBottom: "20px",
//     color: "#3a1f1f",
//   },
//   message: {
//     backgroundColor: "#fef3c7",
//     color: "#92400e",
//     padding: "10px",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   empty: {
//     fontSize: "16px",
//     fontStyle: "italic",
//     color: "#6b7280",
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     marginBottom: "20px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//   },
//   itemList: {
//     paddingLeft: "20px",
//     marginTop: "10px",
//     color: "#374151",
//   },
// };

// export default AdminOrders;

import React, { useEffect, useState } from "react";
import { getOrders, markOrderDelivered, getOrderSummary } from "../api/coffeeApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [summary, setSummary] = useState({ totalOrders: 0, totalSell: 0 });
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchData = () => {
      getOrders()
        .then((res) => {
          console.log("Orders response:", res.data); // ✅ Debug log
          if (Array.isArray(res.data)) {
            setOrders(res.data);
          } else {
            setMessage("❌ Invalid response format");
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setMessage("❌ Failed to load orders");
        });

      getOrderSummary()
        .then((res) => {
          console.log("Summary response:", res.data); // ✅ Debug log
          if (res.data) setSummary(res.data);
        })
        .catch(() => console.error("Failed to fetch summary"));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    if (statusFilter !== "All") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    if (dateFilter) {
      const selectedDate = new Date(dateFilter).toDateString();
      filtered = filtered.filter((o) => {
        const orderDate = o.timestamp ? new Date(o.timestamp).toDateString() : "";
        return orderDate === selectedDate;
      });
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [statusFilter, dateFilter, orders]);

  const handleMarkDelivered = async (id) => {
    try {
      const res = await markOrderDelivered(id);
      if (res.status === 200) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: "Delivered" } : o))
        );
        setMessage("✅ Order marked as delivered");
      } else {
        setMessage("❌ Failed to update order");
      }
    } catch {
      setMessage("❌ Failed to update order");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const getStatusStyle = (status) => ({
    padding: "4px 8px",
    borderRadius: "6px",
    backgroundColor:
      status === "Delivered"
        ? "#c6e6c6"
        : status === "Pending"
        ? "#fce3c3"
        : "#e0e7ff",
    color: "#333",
    fontWeight: "500",
    display: "inline-block",
    whiteSpace: "nowrap",
  });

  const parseItems = (json) => {
    try {
      const items = JSON.parse(json);
      return items.map((item, index) => (
        <li key={index}>
          {item.name} × {item.quantity || 1}
        </li>
      ));
    } catch {
      return <li>Invalid item data</li>;
    }
  };

  const calculateOrderSell = (itemsJson) => {
    try {
      const items = JSON.parse(itemsJson);
      return items.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + price * quantity;
      }, 0);
    } catch {
      return 0;
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const totalSellCalculated = orders.reduce(
    (sum, order) => sum + calculateOrderSell(order.itemsJson),
    0
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Orders</h2>

      <div style={styles.summary}>
        <div style={styles.statBox}>
          <h4 style={styles.statLabel}>Total Orders</h4>
          <p style={styles.statValue}>{summary.totalOrders}</p>
        </div>
        <div style={styles.statBox}>
          <h4 style={styles.statLabel}>Total Sell</h4>
          <p style={styles.statValue}>₹{totalSellCalculated.toFixed(2)}</p>
        </div>
      </div>

      <div style={styles.filters}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Paid">Paid</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={styles.dateInput}
        />
      </div>

      {message && <p style={styles.message}>{message}</p>}

      {currentOrders.length === 0 ? (
        <p style={styles.empty}>No orders found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Method</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} style={styles.tr}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.customer}</td>
                <td style={styles.td}>
                  ₹{calculateOrderSell(order.itemsJson).toFixed(2)}
                </td>
                <td style={styles.td}>
                  <span style={getStatusStyle(order.status)}>
                    {order.status === "Delivered"
                      ? "✅"
                      : order.status === "Pending"
                      ? "🕒"
                      : "💰"}{" "}
                    {order.status}
                  </span>
                </td>
                <td style={styles.td}>{order.method || "—"}</td>
                <td style={styles.td}>
                  {order.timestamp
                    ? new Date(order.timestamp).toLocaleString()
                    : "—"}
                </td>
                <td style={styles.td}>
                  <ul style={styles.itemList}>{parseItems(order.itemsJson)}</ul>
                </td>
                <td style={styles.td}>
                  {order.status !== "Delivered" && (
                    <button
                      style={styles.actionBtn}
                      onClick={() => handleMarkDelivered(order.id)}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              style={{
                ...styles.pageBtn,
                backgroundColor: currentPage === i + 1 ? "#7b4f3d" : "#eee",
                color: currentPage === i + 1 ? "#fff" : "#333",
              }}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" },
  heading: { fontSize: "28px", marginBottom: "20px", color: "#3a1f1f", fontWeight: "600" },
  summary: { display: "flex", gap: "40px", marginBottom: "20px" },
  statBox: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    flex: "1",
    textAlign: "center",
  },
   statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
  },
  filters: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
    alignItems: "center",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  dateInput: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  message: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: "500",
    textAlign: "center",
  },
  empty: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#6b7280",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  th: {
    backgroundColor: "#f3f4f6",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: {
    transition: "background 0.2s ease",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top",
  },
  itemList: {
    paddingLeft: "16px",
    margin: 0,
    listStyleType: "disc",
  },
  actionBtn: {
    backgroundColor: "#2f855a",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s ease",
  },
  pagination: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  pageBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#333",
    transition: "all 0.3s ease",
  },
};

export default AdminOrders;