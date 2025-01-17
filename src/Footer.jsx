import { useTheme } from "./ThemeContext";

const Footer = () => {
  const { theme } = useTheme(); // Access theme from context

  const styles = {
    footer: {
      padding: "1rem",
      backgroundColor: theme.primaryColor || "#ef8354", // Default to #ef8354
      color: theme.secondaryColor || "Black", // Default to Black
      textAlign: "center",
    },
  };

  return (
    <div style={styles.footer}>© 2025 ConvoNext. All rights reserved.</div>
  );
};

export default Footer;
