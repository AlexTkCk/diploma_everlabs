import React from "react";
import { TThemeColor } from "../types.d";

const colors = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  black: "bg-black",
  blue: "bg-blue-500",
};

interface Theme {
  bgColor: TThemeColor;
}

const ThemeButton = ({ bgColor }: Theme) => {
  return (
    <button className={`${colors[bgColor]} h-10 w-10 rounded-full`}></button>
  );
};

export default ThemeButton;
