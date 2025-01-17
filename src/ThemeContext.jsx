import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: "#f3f3f3",
    secondaryColor: "rgb(57 67 76)",
  });

  const updateTheme = (primary, secondary) => {
    setTheme({ primaryColor: primary, secondaryColor: secondary });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
