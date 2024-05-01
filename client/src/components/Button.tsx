import React from "react";

type TButtonProps = {
  text: string;
  handler: () => void;
  bgColor?: "purple" | "transparent" | "green";
};

const bgColorMap = {
  purple: "bg-purple-300",
  transparent: "bg-transparent",
  green: "bg-green-300",
};

const Button = ({ text, handler, bgColor = "transparent" }: TButtonProps) => {
  return (
    <button
      className={`text-button text-black ${
        bgColorMap[bgColor] ? bgColorMap[bgColor] : ""
      } border border-black font-secondary px-8 py-2`}
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default Button;
