import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faSave,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeContext";
import { useUser } from "./UserContext";

function User() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, updateCurrentUserName } = useUser(); // Using UserContext

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: typeof currentUser?.name === "string" ? currentUser.name : "",
    email: currentUser?.email || "",
  });

  // Ensure `currentUser.name` is always a string and set default username if missing
  useEffect(() => {
    if (currentUser && typeof currentUser.name !== "string") {
      const defaultName =
        typeof currentUser.name === "string"
          ? currentUser.name
          : currentUser.email.split("@")[0];
      setCurrentUser((prev) => ({
        ...prev,
        name: defaultName,
      }));
      setFormValues((prev) => ({
        ...prev,
        name: defaultName,
      }));
    }
  }, [currentUser, setCurrentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateDetails = async () => {
    try {
      await updateCurrentUserName(formValues.name.trim()); // Ensure `name` is a string
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #4f5d75, #ef8354)",
      fontFamily: "'Roboto', sans-serif",
    },
    card: {
      width: "90%",
      maxWidth: "600px",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
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
    input: {
      width: "100%",
      padding: "0.5rem 0",
      marginBottom: "1rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "1rem",
      textIndent: "1rem",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",
      marginTop: "2rem",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "32%",
      padding: "0.75rem",
      fontSize: "1rem",
      fontWeight: "bold",
      color: theme.secondaryColor,
      backgroundColor: theme.primaryColor,
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      justifyContent: "center",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    },
    buttonHover: {
      backgroundColor: theme.secondaryColor,
      color: theme.primaryColor,
      transform: "scale(1.05)",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Header />
        <div style={styles.content}>
          <h1 style={styles.heading}>User Profile</h1>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                value={formValues.email}
                disabled
                style={styles.input}
              />
              <div style={styles.buttonRow}>
                <button
                  style={styles.button}
                  onClick={handleUpdateDetails}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, styles.buttonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, styles.button)
                  }
                >
                  <FontAwesomeIcon icon={faSave} />
                  Update
                </button>
                <button
                  style={styles.button}
                  onClick={() => setIsEditing(false)}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, styles.buttonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, styles.button)
                  }
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 style={styles.heading}>{formValues.name}</h2>
              <p>Email: {formValues.email}</p>
              <div style={styles.buttonRow}>
                <button
                  style={styles.button}
                  onClick={() => setIsEditing(true)}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, styles.buttonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, styles.button)
                  }
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </button>
                <button
                  style={styles.button}
                  onClick={() => navigate("/home")}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, styles.buttonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, styles.button)
                  }
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Go Back
                </button>
                <button
                  style={styles.button}
                  onClick={handleLogout}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, styles.buttonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, styles.button)
                  }
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default User;
