"use client"
import React, { ReactNode, useState, useEffect } from "react";
import { createContext } from "react";

interface CreateContextProps {
  colorTheme: string;
  setColorTheme: (value: string) => void;
}
interface ColorThemeProviderProps {
  children: ReactNode;
}

const ColorThemeContext = createContext<CreateContextProps>({
  colorTheme: "light",
  setColorTheme: () => {},
});

const ColorTheme: React.FC<ColorThemeProviderProps> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState("");
  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if(colorTheme === "dark"){
      htmlElement?.classList?.add("dark")
    }else{
      htmlElement?.classList?.remove("dark")
    }
  }, []);

  return (
      <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
        {children}
      </ColorThemeContext.Provider>
  );
};

export { ColorTheme, ColorThemeContext };
