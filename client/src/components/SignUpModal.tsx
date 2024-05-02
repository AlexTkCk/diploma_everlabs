import React, {useContext} from "react";
import Input from "./Input";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import {themeContext} from "../context/ThemeContext";

const SignUpModal = () => {

    const {themeConfig} = useContext(themeContext);

  return (
    <div className={"fixed top-0 left-0 w-full h-full grid place-items-center"}>
      <div
        className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
      ></div>
      <div
        className={
          `w-1/3 -skew-x-12 ${themeConfig.neon} ${themeConfig.secondary} py-5 px-5`
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
          <Input
            placeholder={"*********"}
            changeHandler={() => {}}
            labelText={"Confirm pass"}
          />
          <div className={"flex justify-center items-center gap-5"}>
            <Button
              handler={() => {}}
              buttonClassName="hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white bg-purple-300"
            >
                Sign up
            </Button>
            <FcGoogle className={"text-7xl stroke-black stroke-1"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
