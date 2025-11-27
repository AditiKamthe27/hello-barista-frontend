// src/components/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.background}>
      <div style={styles.content}>
        <h2 style={styles.heading}>About Hello Barista</h2>

        <p style={styles.paragraph}>
          At <strong>Hello Barista</strong>, we believe that great coffee starts long before the first sip. It begins with the right tools, the right technique, and the joy of crafting something personal.
        </p>

        <p style={styles.paragraph}>
          We specialize in <strong>coffee essentials</strong> — from precision grinders and durable portafilters to elegant mugs and flavor-enhancing syrups. Every product we curate is designed to help you brew with confidence, whether you're a home enthusiast or a professional barista.
        </p>

        <p style={styles.paragraph}>
          Our mission is simple: To make premium coffee gear accessible, beautiful, and built to last. We source thoughtfully, design intentionally, and support every step of your brewing journey.
        </p>

        <p style={styles.paragraph}>
          Because coffee isn’t just a beverage — it’s a ritual, a craft, and a connection.
        </p>

        <div style={styles.note}>
          <h4 style={styles.noteHeading}>Brewing Tips 📝</h4>
          <ul style={styles.noteList}>
            <li>Use fresh, filtered water for optimal taste.</li>
            <li>Grind your beans just before brewing.</li>
            <li>Preheat your equipment to maintain temperature.</li>
            <li>Experiment with brew ratios to find your flavor.</li>
            <li>Clean your gear regularly for consistent results.</li>
          </ul>
        </div>

        <h3 style={styles.tagline}>“Brew better. Every day.”</h3>

        <div style={styles.valuesSection}>
          <h4 style={styles.valuesHeading}>Our Values</h4>
          <ul style={styles.valuesList}>
            <li>🌱 Sustainability</li>
            <li>🛠️ Craftsmanship</li>
            <li>🤝 Community</li>
          </ul>
        </div>

        <div style={styles.visuals}>
          <span style={styles.icon}>🧊</span> {/* Grinder */}
          <span style={styles.icon}>☕</span> {/* Mug */}
          <span style={styles.icon}>🛠️</span> {/* Portafilter */}
          <span style={styles.icon}>🍶</span> {/* Syrup */}
        </div>

        <div style={styles.singleButton}>
          <button style={styles.button} onClick={() => navigate("/products")}>
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: "#4b2e2e", // coffee brown
    minHeight: "100%",
    padding: "60px 20px",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#4b2e2e",
  },
  paragraph: {
    fontSize: "16px",
    color: "#5a3e36",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  tagline: {
    fontSize: "18px",
    fontWeight: "600",
    fontStyle: "italic",
    color: "#4b2e2e",
    margin: "30px 0 20px",
  },
  valuesSection: {
    marginBottom: "30px",
  },
  valuesHeading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#4b2e2e",
  },
  valuesList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "16px",
    color: "#5a3e36",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  visuals: {
    fontSize: "28px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  icon: {
    transition: "transform 0.3s ease",
  },
  singleButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    padding: "10px 25px",
    backgroundColor: "#4b2e2e",
    color: "white",
    border: "none",
    borderRadius: "999px",
    fontWeight: "500",
    cursor: "pointer",
  },
  note: {
    backgroundColor: "#fff8dc", // light parchment
    borderLeft: "6px solid #f4a261", // warm accent
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "left",
  },
  noteHeading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#4b2e2e",
    marginBottom: "10px",
  },
  noteList: {
    paddingLeft: "20px",
    margin: 0,
    color: "#5a3e36",
    fontSize: "15px",
    lineHeight: "1.6",
  },
};

export default About;