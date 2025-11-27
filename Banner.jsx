// // src/components/Banner.jsx
// import React from "react";

// const Banner = () => {
//   return (
//     <div style={styles.banner}>
//       {/* Overlay for dark effect */}
//       <div style={styles.overlay}></div>

//       {/* Welcome Text */}
//       <h1 style={styles.text}>Welcome to Hello Barista</h1>
//     </div>
//   );
// };

// const styles = {
//   banner: {
//     height: "100vh", // full screen height
//     backgroundImage:
//       "url('https://images.unsplash.com/photo-1511920170033-f8396924c348')", // Coffee background
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     position: "relative",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "64px", // to avoid overlap with navbar
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     height: "100%",
//     width: "100%",
//     backgroundColor: "rgba(0,0,0,0.4)", // transparent dark overlay
//   },
//   text: {
//     color: "white",
//     fontSize: "48px",
//     fontWeight: "bold",
//     zIndex: 2, // keep text above overlay
//   },
// };

// export default Banner;



// src/components/Banner.jsx
import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div style={styles.banner}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.text}>Welcome to Hello Barista</h1>
        <Link to="/products" style={styles.button}>Shop Now</Link>
      </div>
    </div>
  );
};

const styles = {
  banner: {
  height: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1511920170033-f8396924c348')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0px",       // ✅ Removed white space above
  paddingTop: "0px",      // ✅ Ensures flush alignment
  marginBottom: "0px",    // ✅ Prevents extra space below
},
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    zIndex: 2,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: "48px",
    fontWeight: "600",
    marginBottom: "20px",
    fontFamily: "Georgia, serif",
  },
  button: {
    padding: "12px 28px",
    backgroundColor: "#7b4f3d", // soft mocha brown
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    borderRadius: "999px", // pill shape
    fontSize: "16px",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
};

// Add this to your global CSS or App.css for hover effect:
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  a[href="/products"]:hover,
  a[href="/"]:hover,
  a[href="/about"]:hover {
    background-color: #a06b58 !important;
    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
  }
`;
document.head.appendChild(styleTag);

export default Banner;