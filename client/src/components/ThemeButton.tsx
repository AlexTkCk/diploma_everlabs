import React from "react";
import {TThemeColor} from "../types";

const colors = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  black: "bg-black",
  blue: "bg-blue-500",
};

const shadows = {
  green: "shadow-green-300",
  red: "shadow-red-300",
  yellow: "shadow-yellow-300",
  black: "shadow-white",
  blue: "shadow-blue-300",
};

interface TThemeButtonProps {
  bgColor: TThemeColor;
  handler: () => void;
  isActive?: boolean,
}

const ThemeButton = ({ bgColor, handler, isActive=false }: TThemeButtonProps) => {
  return (
    <button onClick={handler} className={`${colors[bgColor]} ${isActive && 'shadow-neon border-white border scale-105'} h-10 w-10 rounded-full`}></button>
  );
};

export default ThemeButton;
