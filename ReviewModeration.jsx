import React, { useState } from "react";

const ReviewModeration = () => {
  const [reviews] = useState([
    { id: 1, user: "Priya", text: "Love the pitcher!" },
    { id: 2, user: "Arjun", text: "Solid portafilter." },
  ]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Moderate Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} style={styles.card}>
          <p><strong>{review.user}</strong>: {review.text}</p>
        </div>
      ))}
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
  card: {
    backgroundColor: "#fffaf0",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
};

export default ReviewModeration;