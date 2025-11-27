// src/admin/OrderList.jsx
import React from "react";

const orders = [
  { id: 101, user: "Priya", item: "Milk Frothing Pitcher", status: "Delivered" },
  { id: 102, user: "Arjun", item: "Portafilter", status: "Pending" },
];

const OrderList = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recent Orders</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>User</th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.user}</td>
              <td style={styles.td}>{order.item}</td>
              <td style={styles.td}>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  backgroundColor: order.status === "Delivered" ? "#c6e6c6" : "#fce3c3",
                  color: "#333",
                  fontWeight: "500"
                }}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#3a1f1f",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#eee",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
};

export default OrderList;