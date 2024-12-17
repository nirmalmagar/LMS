// import ReactSwitch from "react-switch";
// import { useContext, useEffect, useState } from "react";
// import { ColorThemeContext } from "@/context/ColorTheme";

// export const DarkModeSwitcher = () => {
//   const { colorTheme, setColorTheme } = useContext(ColorThemeContext);
//   const [changeColor, setChangeColor] = useState(colorTheme === "dark");
//   console.log("darkmode",colorTheme);
//   console.log("darkmode color", changeColor);

//   return (
//     <>
//       <ReactSwitch
//       className={colorTheme === 'dark' ? 'isDark' : undefined}
//         onChange={() => {
//           setChangeColor(!changeColor)
//           setColorTheme(colorTheme === "dark" ? "light" : "dark");
//         }}
//         checked={changeColor}
//       />
//     </>
//   );
// };


import React, { useContext, useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import { AppColorThemeContext } from "@/context/ColorTheme";

const DarkModeSwitcher = () => {
  const {colorTheme , setColorTheme} = useContext(AppColorThemeContext)
  const [change, setChange] = useState(colorTheme === "dark");
  return (
    <ReactSwitch
    // className={colorTheme === 'dark' ? 'isDark' : undefined}
      onChange={(e) => {
          setChange(!change)
          setColorTheme(colorTheme === "dark" ? "light" : "dark")
      }}
      checked={change}
    />
  );
};

export default DarkModeSwitcher;
