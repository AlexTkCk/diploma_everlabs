import React from "react";

type TInput = {
  placeholder?: string;
  labelText: string;
  changeHandler: (e: any) => void;
  type?: "text" | "password";
  value?: string
};

const Input = ({
  placeholder = "",
  labelText,
  changeHandler,
  type = "text",
  value
}: TInput) => {
  return (
    <label className={"flex flex-col font-primary text-title-lg"}>
      {labelText}
      <input
        onChange={changeHandler}
        type={type}
        value={value}
        placeholder={placeholder}
        className={"font-secondary text-label-lg rounded-full px-3"}
      />
    </label>
  );
};

export default Input;
