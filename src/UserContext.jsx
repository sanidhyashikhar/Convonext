import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./firebase"; // Firebase auth and Firestore
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// Create the context
const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Current user
  const [activeUser, setActiveUser] = useState(null); // Active chat user (object)
  const [activeUserId, setActiveUserId] = useState(null); // Active chat user ID
  const [activeUserName, setActiveUserName] = useState(null); // Active chat user Name
  const [allUsers, setAllUsers] = useState([]); // All users excluding the current user

  // Fetch current user from Firebase Auth
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser({
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email.split("@")[0], // Use displayName or email prefix
        });
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch all users excluding the current user
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (currentUser) {
        try {
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const userList = [];

          usersSnapshot.forEach((doc) => {
            if (doc.id !== currentUser.id) {
              userList.push({ id: doc.id, ...doc.data() });
            }
          });

          setAllUsers(userList);

          // Set the first user as the active user if not already set
          if (!activeUser && userList.length > 0) {
            const firstUser = userList[0];
            setActiveUser(firstUser); // Store the whole user object
            setActiveUserId(firstUser.id); // Store only the ID
            setActiveUserName(firstUser.name); // Store only the Name
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchAllUsers();
  }, [currentUser, activeUser]);

  // Function to update the current user's name in Firestore
  const updateCurrentUserName = async (newName) => {
    if (!currentUser) {
      console.error("No current user to update.");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, { name: newName });

      // Update the local state after successfully updating Firestore
      setCurrentUser((prevUser) => ({
        ...prevUser,
        name: newName,
      }));

      console.log("Current user's name updated successfully.");
    } catch (error) {
      console.error("Error updating user's name in Firestore:", error);
    }
  };

  // Function to update the active user
  const updateActiveUser = (user) => {
    setActiveUser(user);
    setActiveUserId(user?.id || null); // Safeguard in case user is null
    setActiveUserName(user?.name || null); // Safeguard in case user is null
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser, // Pass setCurrentUser to the context
        activeUser,
        activeUserId,
        activeUserName,
        allUsers,
        setActiveUser: updateActiveUser, // Pass the update function to the context
        updateCurrentUserName, // Pass the update function to the context
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to use the UserContext
export const useUser = () => useContext(UserContext);
