import ReactSwitch from "react-switch";
import { useContext, useState } from "react";
import { ColorThemeContext } from "@/context/ColorTheme";

export const DarkModeSwitcher = () => {
  const { colorTheme, setColorTheme } = useContext(ColorThemeContext);
  const [changeColor, setChangeColor] = useState<boolean>(false);
  console.log("theme color", changeColor)
  return (
    <>
      <ReactSwitch
        onChange={() => {
          setChangeColor(!changeColor);
        }}
        checked={changeColor}
      />
    </>
  );
};
