import React from "react";
import Input from "./Input";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  return (
    <div className={"fixed w-full h-full grid place-items-center"}>
      <div
        className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
      ></div>
      <div
        className={
          "w-fit -skew-x-12 shadow-neon bg-green-400 py-5 border border-white border-2 px-5"
        }
      >
        <div className={"mx-auto flex flex-col gap-10"}>
          <Input
            placeholder={"example@gmail.com"}
            changeHandler={() => {}}
            labelText={"Login"}
          />
          <Input
            placeholder={"*********"}
            changeHandler={() => {}}
            labelText={"Password"}
          />
          <div className={"flex justify-between items-center gap-2"}>
            <Button handler={() => {}} text={"Log In"} bgColor={"purple"} />
            <FcGoogle className={"text-7xl stroke-black stroke-1"} />
            <span className={"text-title-md text-nowrap"}>... or Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
