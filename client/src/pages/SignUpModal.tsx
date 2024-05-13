import React, {useContext, useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import {themeContext} from "../context/ThemeContext";
import {pageVariants} from "../styles/variants";
import { motion } from "framer-motion";
import {jwtData, userContext} from "../context/UserContext";
import {v4 as uuid4} from 'uuid';
import {useNavigate} from "react-router";

const SignUpModal = () => {

    const {themeConfig} = useContext(themeContext);
    const [email, setEmail] = useState('');
    const {setUserId} = useContext(userContext);

    const navigate = useNavigate();

  return (
      <motion.div className={"relative w-full h-full grid place-items-center"}
           variants={pageVariants}
           initial={'initial'}
           animate={'animate'}
           exit={'exit'}>
          <div
              className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
          ></div>
      <div
        className={
          `w-1/3 -skew-x-12 ${themeConfig.neon} ${themeConfig.info} py-5 px-5`
        }
      >
        <div className={"mx-auto flex flex-col gap-10"}>
          <Input
            placeholder={"example@gmail.com"}
            changeHandler={({currentTarget: {value}}) => {setEmail(value)}}
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
              handler={() => {
                  const jwt = uuid4().slice(0, 6);
                  const id = '' + jwtData.length;
                  jwtData.push({
                      email,
                      jwt,
                      id,
                      name: 'user ' + jwt
                  })
                  setUserId(id);
                  localStorage.setItem('jwt', jwt);
                  navigate('/');
              }}
              buttonClassName="hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white bg-purple-300"
            >
                Sign up
            </Button>
            <FcGoogle className={"text-7xl stroke-black stroke-1"} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpModal;
