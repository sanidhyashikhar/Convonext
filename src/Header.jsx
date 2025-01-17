import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useUser } from "./UserContext"; // Import UserContext

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useUser(); // Access current user from context

  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      backgroundColor: "#f3f3f3", // Light greyish background
      color: theme.secondaryColor || "#333", // Text color
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      position: "relative",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    logo: {
      width: "250px",
      height: "60px",
      marginRight: "10px",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    profilePic: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      cursor: "pointer",
    },
    userIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: theme.primaryColor || "#4f5d75", // Fallback to primary theme color
      color: theme.secondaryColor || "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    settingsIcon: {
      cursor: "pointer",
      fontSize: "1.5rem",
      transition: "color 0.3s ease",
    },
  };

  return (
    <div style={styles.header}>
      {/* Leftmost: Logo */}
      <div style={styles.logoSection} onClick={() => navigate("/home")}>
        <img
          src="/images/convonext-high-resolution-logo-transparent.png"
          alt="Logo"
          style={styles.logo}
        />
      </div>

      {/* Rightmost: Profile Picture or User Icon and Settings */}
      <div style={styles.rightSection}>
        <FontAwesomeIcon
          icon={faCog}
          style={styles.settingsIcon}
          onMouseEnter={(e) => (e.target.style.color = "black")} // Hover effect
          onMouseLeave={(e) =>
            (e.target.style.color = theme.secondaryColor || "#333")
          }
          onClick={() => navigate("/settings")}
        />
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            style={styles.profilePic}
            onClick={() => navigate("/user")}
          />
        ) : (
          <div style={styles.userIcon} onClick={() => navigate("/user")}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
