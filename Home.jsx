// // src/components/Home.jsx
// import React from "react";

// const Home = () => {
//   return (
//     <div style={styles.container}>
//       <h2>Discover the Best Coffee Experience</h2>
//       <p>
//         At <strong>Hello Barista</strong>, we bring you freshly brewed coffee,
//         handcrafted with passion and love. Taste the richness in every sip!
//       </p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     marginTop: "120px",
//     padding: "20px",
//   },
// };

// export default Home;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const bestsellers = [
  {
    id: 1,
    name: "Espresso Roast",
    description: "Rich and bold flavor, perfect for espresso lovers.",
    price: "₹950.99",
    image: "https://tinyurl.com/y5a29zeh",
  },
  {
    id: 2,
    name: "Brew Blend",
    description: "Smooth and refreshing, ideal for cold brews.",
    price: "₹1100.99",
    image: "https://shorturl.at/8aXf1",
  },
  {
    id: 5,
    name: "Professional Portafilter",
    description: "Durable stainless steel portafilter for espresso machines.",
    price: "₹1200.99",
    image: "https://shorturl.at/0HTbT",
  },
  {
    id: 6,
    name: "Milk Frothing Pitcher",
    description: "Perfect for frothing milk for lattes and cappuccinos.",
    price: "₹1750.99",
    image: "https://shorturl.at/YGtXf",
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAuthClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      {showModal && (
        <div role="dialog" aria-modal="true">
          <AuthModal onClose={handleAuthClose} />
        </div>
      )}

      <div style={styles.backgroundWrapper}>
        {/* Bestsellers Section */}
        <div style={styles.bestsellerSection}>
          <h1 style={styles.subheading}><strong><i>Bestsellers</i></strong></h1>
          <div style={styles.grid}>
            {bestsellers.map((item) => (
              <div
                key={item.id}
                style={styles.card}
                onClick={() => navigate("/products")}
              >
                <img src={item.image} alt={item.name} style={styles.image} />
                <h4>{item.name}</h4>
                <p style={styles.desc}>{item.description}</p>
                <p style={styles.price}>{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Promise */}
        <div style={styles.promise}>
          <h3>Discover the Best Coffee Essentials</h3>
          <p>
            At <strong>Hello Barista</strong>, we curate premium tools for passionate brewers—from precision portafilters to elegant frothing 
            pitchers. Every product is designed to elevate your home café setup with style, durability, and barista-level performance. Brew 
            better, every day.
          </p>
        </div>

        {/* Testimonials */}
        <div style={styles.testimonials}>
          <h3 style={styles.testimonialHeading}>What Our Customers Say</h3>
          <div style={styles.testimonialGrid}>
            <div style={styles.testimonialCard}>
              <p style={styles.quote}>
                “Finally found a frothing pitcher that doesn’t spill. Love it!”
              </p>
              <p style={styles.name}>– Priya</p>
            </div>
            <div style={styles.testimonialCard}>
              <p style={styles.quote}>
                “The portafilter is solid—feels like a pro setup.”
              </p>
              <p style={styles.name}>– Arjun</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "0px",
    padding: "0px",
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.6",
    animation: "fadeIn 0.6s ease-in-out",
    boxSizing: "border-box",
    wordBreak: "break-word",
  },
  backgroundWrapper: {
    padding: "60px 20px",
    width: "100%",
  },
  bestsellerSection: {
    marginBottom: "40px",
    backgroundColor: "#c5c6bfc2",
    padding: "40px 20px",
    borderRadius: "12px",
  },
  subheading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#3a1f1f",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "32px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#9e8656ff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  desc: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  price: {
    fontWeight: "bold",
    color: "#3a1f1f",
  },
  promise: {
    backgroundColor: "#9f9a90ff",
    padding: "40px 20px",
    borderRadius: "12px",
    marginTop: "40px",
    color: "#3a1f1f",
  },
  testimonials: {
    marginTop: "60px",
    padding: "40px 20px",
    backgroundColor: "#8f8484ff",
    borderRadius: "12px",
    color: "#674c4cff",
  },
  testimonialHeading: {
    fontSize: "24px",
    marginBottom: "30px",
    fontFamily: "serif",
  },
  testimonialGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
  testimonialCard: {
    backgroundColor: "#fffaf0",
    padding: "20px",
    borderRadius: "12px",
    width: "280px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontStyle: "italic",
    color: "#4d2c2cff",
  },
  quote: {
    marginBottom: "12px",
  },
  name: {
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "right",
  },
};

export default Home;