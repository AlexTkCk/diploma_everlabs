import React from "react";
import { IconType } from "react-icons";

type TButtonProps = {
  text: string;
  handler: () => void;
  bgColor?: "purple" | "transparent" | "green";
  buttonClassName?: string;
  icon?: IconType;
};

const bgColorMap = {
  purple: "bg-purple-300",
  transparent: "bg-transparent",
  green: "bg-green-300",
};

const Button = ({
  text,
  handler,
  bgColor = "transparent",
  icon: Icon,
  buttonClassName = "",
}: TButtonProps) => {
  return (
    <button
      className={`text-button text-black ${
        bgColorMap[bgColor] ? bgColorMap[bgColor] : ""
      } border border-black font-secondary px-8 py-2 flex flex-row gap-5 items-center rounded-sm ${buttonClassName}`}
      onClick={handler}
    >
      {text}
      {Icon && <Icon className="text-button" />}
    </button>
  );
};

export default Button;
