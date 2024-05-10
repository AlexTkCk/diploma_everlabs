import React, {useContext} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import {themeContext} from "../context/ThemeContext";
import {Link} from "react-router-dom";

const LoginModal = () => {

    const {themeConfig} = useContext(themeContext);

  return (
    <div className={"relative w-full h-full grid place-items-center"}>
      <div
        className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
      ></div>
      <div
        className={
          `w-fit -skew-x-12 ${themeConfig.neon} ${themeConfig.info} py-5 border-2 px-5`
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
            <Button
              handler={() => {}}

              buttonClassName="hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white bg-purple-300"
            >
                Log in
            </Button>
            <FcGoogle className={"text-7xl stroke-black stroke-1"} />
            <Link to={'/signUp'} className={"text-title-md text-nowrap"}>... or Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
