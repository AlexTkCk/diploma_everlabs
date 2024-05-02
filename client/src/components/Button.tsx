import React, { ReactNode } from "react";

type TButtonProps = {
  handler: () => void;
  buttonClassName?: string;
  children?: ReactNode | ReactNode[];
};

const Button = ({ handler, children, buttonClassName = "" }: TButtonProps) => {
  return (
    <button
      className={`text-button text-black border border-black font-secondary px-8 py-2 flex flex-row gap-5 items-center rounded-sm ${buttonClassName}`}
      onClick={handler}
    >
      {children}
    </button>
  );
};

export default Button;
