import React, {useContext} from "react";
import {TThemeColor} from "../types";
import {themeContext} from "../context/ThemeContext";

const colors = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  black: "bg-black",
  blue: "bg-blue-500",
};

const neonStyles = {
  green: "shadow-neon-green",
  red: "shadow-neon-red",
  yellow: "shadow-neon-yellow",
  blue: "shadow-neon-blue",
  black: "",
}


const ThemeButton = ({ bgColor }: {bgColor: TThemeColor}) => {

  const {themeValue, setThemeValue} = useContext(themeContext);

  return (
    <button onClick={() => setThemeValue(bgColor)} className={`${colors[bgColor]} ${themeValue === bgColor && neonStyles[themeValue] + ' border-white border scale-110'} h-10 w-10 rounded-full`}></button>
  );
};

export default ThemeButton;
