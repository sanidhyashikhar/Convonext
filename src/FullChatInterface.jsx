import { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";

const FullChatInterface = () => {
  const inputRef = useRef(null); // Input ref for focusing the chat input

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #4f5d75, #ef8354)",
      padding: "1rem",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "1200px",
      minHeight: "80vh",
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
    },
    main: {
      flex: 1,
      display: "flex",
    },
    header: {
      borderBottom: "1px solid #ddd",
    },
    footer: {
      borderTop: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.main}>
          <Sidebar />
          <ChatScreen inputRef={inputRef} />
        </div>
        <div style={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FullChatInterface;
