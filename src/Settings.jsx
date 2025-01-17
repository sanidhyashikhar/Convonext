import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "./ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const { theme, updateTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(theme.secondaryColor);
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #4f5d75, #ef8354)", // Same gradient as FullChatInterface
      fontFamily: "'Roboto', sans-serif",
    },
    card: {
      width: "90%",
      maxWidth: "800px",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    content: {
      padding: "2rem",
      flex: 1,
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      textAlign: "center",
      color: "#333",
    },
    section: {
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#333",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    colorPickerContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    colorPreview: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    label: {
      fontSize: "14px",
      color: "#333",
      flex: "1",
    },
    colorInput: {
      width: "50px",
      height: "30px",
      border: "none",
      outline: "none",
      cursor: "pointer",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "2rem",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "48%",
      padding: "0.75rem",
      fontSize: "1rem",
      fontWeight: "bold",
      color: secondaryColor,
      backgroundColor: primaryColor,
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      justifyContent: "center",
      textAlign: "center",
    },
  };

  const handleThemeChange = () => {
    updateTheme(primaryColor, secondaryColor);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Header />
        <div style={styles.content}>
          <h1 style={styles.heading}>Settings</h1>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>About ConvoNext</h3>
            <p>
              ConvoNext is a modern chat application designed for seamless
              communication and collaboration. Version 1.0.0.
            </p>
          </div>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Change Theme</h3>
            <div style={styles.inputGroup}>
              <div style={styles.colorPickerContainer}>
                <div
                  style={{
                    ...styles.colorPreview,
                    backgroundColor: primaryColor,
                  }}
                ></div>
                <label htmlFor="primaryColor" style={styles.label}>
                  Primary Color:
                </label>
                <input
                  type="color"
                  id="primaryColor"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>
              <div style={styles.colorPickerContainer}>
                <div
                  style={{
                    ...styles.colorPreview,
                    backgroundColor: secondaryColor,
                  }}
                ></div>
                <label htmlFor="secondaryColor" style={styles.label}>
                  Secondary Color:
                </label>
                <input
                  type="color"
                  id="secondaryColor"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.button} onClick={handleThemeChange}>
                <FontAwesomeIcon icon={faCheck} />
                Apply Theme
              </button>
              <button
                style={styles.button}
                onClick={() => navigate("/home")} // Go back to the previous page
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
