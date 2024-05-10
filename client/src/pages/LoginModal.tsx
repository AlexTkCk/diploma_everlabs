import React, {useContext, useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import {themeContext} from "../context/ThemeContext";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {pageVariants} from "../styles/variants";
import {login} from "../data/mockupAuthFunctions";
import {userContext} from "../context/UserContext";
import {TUser} from "../types";
import {useNavigate} from "react-router";

const LoginModal = () => {

    const {themeConfig} = useContext(themeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(userContext);
    const navigate = useNavigate();

  return (
    <motion.div
        variants={pageVariants}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        className={"relative w-full h-full grid place-items-center"}>
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
            changeHandler={(e) => {setEmail(e.currentTarget.value)}}
            labelText={"Login"}
          />
          <Input
            placeholder={"*********"}
            changeHandler={(e) => {setPassword(e.currentTarget.value)}}
            labelText={"Password"}
          />
          <div className={"flex justify-between items-center gap-2"}>
            <Button
              handler={() => {
                  login(email, password).then(user => {
                      if (user) {
                          setUser(user as TUser)
                          navigate('/account')
                      }
                  }).catch(reason => {console.log(reason.message)})
              }}

              buttonClassName="hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white bg-purple-300"
            >
                Log in
            </Button>
            <FcGoogle className={"text-7xl stroke-black stroke-1"} />
            <Link to={'/signUp'} className={"text-title-md text-nowrap"}>... or Sign Up</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginModal;
