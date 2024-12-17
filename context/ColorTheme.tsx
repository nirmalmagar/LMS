// "use client";
// import React, { ReactNode, useState, useEffect } from "react";
// import { createContext } from "react";

// interface CreateContextProps {
//   colorTheme: string;
//   setColorTheme: (value: string) => void;
// }
// interface ColorThemeProviderProps {
//   children: ReactNode;
// }

// const ColorThemeContext = createContext<CreateContextProps>({
//   colorTheme: "light",
//   setColorTheme: () => {},
// });

// const ColorTheme: React.FC<ColorThemeProviderProps> = ({ children }) => {
//   const [colorTheme, setColorTheme] = useState("");

//   useEffect(() => {
//     const colorTheme = window.localStorage.getItem("color-theme");
//     if (colorTheme) {
//       setColorTheme(colorTheme);
//       const htmlElment = document.querySelector("html");
//       if (htmlElment) {
//         htmlElment?.classList.add("dark");
//       } else {
//         htmlElment?.classList.remove("dark");
//       }
//     }
//   });

//   useEffect(() => {
//     const className = "dark";
//     const htmlElement = document.querySelector("html");
//     if (className === "dark") {
//       htmlElement?.classList?.add(className);
//     } else {
//       htmlElement?.classList?.remove(className);
//     }
//     window.localStorage.setItem("color-theme", colorTheme);
//   }, []);

//   return (
//     <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
//       {children}
//     </ColorThemeContext.Provider>
//   );
// };

// export { ColorTheme, ColorThemeContext };


import { createContext, ReactNode, useEffect, useState } from "react"


interface AppColorThemeProviderContextProps { 
    colorTheme : string,
    setColorTheme : (value : string) => void
}

interface AppColorThemeProviderProps {
    children : ReactNode
}  

const AppColorThemeContext = createContext<AppColorThemeProviderContextProps>({
    colorTheme : 'light',
    setColorTheme : () => {}
})

const AppColorThemeProvider: React.FC<AppColorThemeProviderProps> = ({children}) => {
    const [colorTheme , setColorTheme] = useState('') 
    

    useEffect(() => {
        const colorTheme = window.localStorage.getItem('color-theme')
        if(colorTheme) {
            setColorTheme(colorTheme)
            const htmlElement = document.querySelector('html'); // Get the <html> element
            if (colorTheme === "dark") {
                htmlElement?.classList.add('dark');
            }else{
                htmlElement?.classList.remove('dark')
            }
        }
    },[])

    useEffect(() => {
        const className = 'dark';
        const htmlElement = document.querySelector('html'); // Get the <html> element
        if (htmlElement) {
          if (colorTheme === "dark") {
            htmlElement.classList.add(className);
          } else {
            htmlElement.classList.remove(className);
          }
        }
        window.localStorage.setItem('color-theme',colorTheme)
    },[colorTheme])

    return(
        <AppColorThemeContext.Provider
            value={{
                colorTheme,
                setColorTheme
            }}
        >
            {children}
        </AppColorThemeContext.Provider>
    )
}

export { AppColorThemeContext , AppColorThemeProvider }
