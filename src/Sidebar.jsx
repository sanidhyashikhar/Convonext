import { useTheme } from "./ThemeContext";
import { useUser } from "./UserContext"; // Import UserContext
import { useState } from "react";

const Sidebar = () => {
  const { theme } = useTheme(); // Access theme from context
  const { allUsers, activeUser, setActiveUser } = useUser(); // Access user-related data from context
  const [searchTerm, setSearchTerm] = useState(""); // Track search input

  const handleChatSelection = (user) => {
    console.log("Selected user for chat:", user);
    setActiveUser(user); // Directly set the active user object
  };

  const styles = {
    sidebar: {
      width: "20%",
      backgroundColor: theme.secondaryColor || "#4f5d75",
      color: "#ecf0f1",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      gap: "1rem",
      maxHeight: "calc(70vh - 100px)", // Adjust maximum height to fit within the viewport
      overflowY: "auto", // Enable vertical scrolling
    },
    searchBar: {
      padding: "0.5rem",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "1rem",
      backgroundColor: theme.primaryColor || "#ffffff",
      color: theme.secondaryColor || "#4f5d75",
    },
    sidebarItem: {
      marginBottom: "1rem",
      padding: "0.75rem",
      cursor: "pointer",
      borderRadius: "5px",
      backgroundColor: theme.primaryColor || "#ef8354",
      color: theme.secondaryColor || "#4f5d75",
      textAlign: "center",
      transition: "background 0.3s ease",
    },
    activeSidebarItem: {
      backgroundColor: "mediumseagreen",
      color: "#ffffff",
      fontWeight: "bold",
      transform: "scale(1.05)", // Slightly enlarge active item
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for active item
    },
    noUsersMessage: {
      textAlign: "center",
      marginTop: "2rem",
      color: "#d1d1d1",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.sidebar}>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchBar}
      />
      {allUsers.length > 0 ? (
        allUsers
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => {
            const isActive = activeUser?.id === user.id;
            console.log(
              `Checking active user: user.name=${user.name}, activeUser.name=${activeUser?.name}, isActive=${isActive}`
            );

            return (
              <div
                key={user.id}
                style={{
                  ...styles.sidebarItem,
                  ...(isActive ? styles.activeSidebarItem : {}),
                }}
                onClick={() => handleChatSelection(user)}
              >
                {user.name}
              </div>
            );
          })
      ) : (
        <div style={styles.noUsersMessage}>No users available</div>
      )}
    </div>
  );
};

export default Sidebar;
