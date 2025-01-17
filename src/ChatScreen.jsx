import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeContext";
import { useUser } from "./UserContext";
import { db } from "./firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const ChatScreen = () => {
  const { theme } = useTheme();
  const { currentUser, activeUser, setActiveUser, allUsers } = useUser();
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Log user context data
  console.log("User Context Data:");
  console.log("Current User:", currentUser);
  console.log("Active Chat User:", activeUser);
  console.log("All Users:", allUsers);

  // Function to fetch or create chat ID
  const getOrCreateChatId = async (currentUserId, activeChatUserId) => {
    console.log("Attempting to fetch or create a chat ID...");
    console.log("Current User ID:", currentUserId);
    console.log("Active Chat User ID:", activeChatUserId);

    if (!currentUserId || !activeChatUserId) {
      console.error("Invalid IDs for creating a chat. Exiting function.");
      return null;
    }

    const chatsRef = collection(db, "chats");

    // Query for chats involving the current user
    try {
      const chatQuery = query(
        chatsRef,
        where("participants", "array-contains", currentUserId)
      );
      const chatSnapshot = await getDocs(chatQuery);

      console.log("Fetched chat documents. Checking for an existing chat...");

      // Check if a chat exists with the active chat user
      let existingChat = null;
      chatSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Existing Chat Data:", data);
        if (data.participants.includes(activeChatUserId)) {
          existingChat = { id: doc.id, ...data };
        }
      });

      if (existingChat) {
        console.log("Existing chat found with ID:", existingChat.id);
        return existingChat.id;
      } else {
        console.log(
          "No existing chat found. Creating a new chat...",
          currentUserId,
          activeChatUserId
        );
        const newChatRef = await addDoc(chatsRef, {
          participants: [currentUserId, activeChatUserId],
          messages: [],
        });
        console.log("New chat created with ID:", newChatRef.id);
        return newChatRef.id;
      }
    } catch (error) {
      console.error("Error in fetching or creating chat ID:", error);
      return null;
    }
  };

  // Subscribe to chat messages in real-time
  useEffect(() => {
    if (activeChatId) {
      console.log("Subscribing to chat messages for Chat ID:", activeChatId);
      const chatRef = doc(db, "chats", activeChatId);
      const unsubscribe = onSnapshot(chatRef, (snapshot) => {
        const chatData = snapshot.data();
        console.log("Fetched chat messages:", chatData?.messages);
        setMessages(chatData?.messages || []);
      });

      return () => {
        console.log(
          "Unsubscribing from chat messages for Chat ID:",
          activeChatId
        );
        unsubscribe();
      };
    }
  }, [activeChatId]);

  // Handle sending a message
  const handleSendMessage = async (messageText) => {
    if (!activeChatId || !messageText.trim()) {
      console.error(
        "Cannot send message. Either activeChatId or messageText is invalid."
      );
      return;
    }

    const chatRef = doc(db, "chats", activeChatId);
    try {
      console.log("Sending message:", messageText);
      await updateDoc(chatRef, {
        messages: arrayUnion({
          sender: currentUser?.id,
          text: messageText,
          timestamp: new Date().toISOString(),
        }),
      });
      console.log("Message sent successfully.");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch or create the chat ID when activeUser changes
  useEffect(() => {
    if (currentUser && activeUser) {
      (async () => {
        console.log("Fetching/Creating chat for current user and active user.");
        const chatId = await getOrCreateChatId(currentUser.id, activeUser.id);
        if (chatId) {
          console.log("Chat ID set successfully:", chatId);
          setActiveChatId(chatId);
        } else {
          console.error("Failed to fetch or create chat ID.");
        }
      })();
    }
  }, [currentUser, activeUser]);

  // Set the first user as active user on component mount
  useEffect(() => {
    if (allUsers.length > 0 && !activeUser) {
      console.log("Setting the first user as the active user:", allUsers[0]);
      setActiveUser(allUsers[0]);
    }
  }, [allUsers, activeUser, setActiveUser]);

  // Focus input on chat change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChatId]);

  // Styles
  const styles = {
    chatMain: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      borderLeft: "1px solid #ddd",
      width: "80%",
      padding: "1rem",
    },
    messageList: {
      flex: 1,
      overflowY: "auto", // Enable vertical scrolling
      maxHeight: "calc(70vh - 200px)", // Adjust height to fit the screen
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    messageBubble: {
      padding: "0.75rem",
      borderRadius: "15px",
      margin: "0.5rem 0",
      maxWidth: "45%",
      wordWrap: "break-word",
    },
    sentMessage: {
      backgroundColor: theme.secondaryColor || "#4f5d75",
      color: theme.primaryColor || "#ffffff",
      alignSelf: "flex-end",
    },
    receivedMessage: {
      backgroundColor: theme.primaryColor || "#ef8354",
      color: theme.secondaryColor || "#000000",
      alignSelf: "flex-start",
    },
    messageInputContainer: {
      display: "flex",
      alignItems: "center",
      borderTop: "1px solid #ddd",
      padding: "1rem",
    },
    messageInput: {
      flex: 1,
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      marginRight: "0.5rem",
    },
    sendButton: {
      display: "flex",
      alignItems: "center",
      padding: "0.75rem",
      backgroundColor: theme.secondaryColor || "#4f5d75",
      color: theme.primaryColor || "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    sendIcon: {
      marginLeft: "0.5rem",
    },
  };

  return (
    <div style={styles.chatMain}>
      <div style={styles.messageList}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageBubble,
              ...(msg.sender === currentUser?.id
                ? styles.sentMessage
                : styles.receivedMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.messageInputContainer}>
        <input
          type="text"
          placeholder="Type a message"
          style={styles.messageInput}
          ref={inputRef}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSendMessage(event.target.value);
              event.target.value = "";
            }
          }}
        />
        <button
          style={styles.sendButton}
          onClick={() => {
            const input = inputRef.current;
            handleSendMessage(input.value);
            input.value = "";
          }}
        >
          Send
          <FontAwesomeIcon icon={faPaperPlane} style={styles.sendIcon} />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
