import React, { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { themeContext } from "../context/ThemeContext";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../context/UserContext";
import { pageVariants } from "../styles/variants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { serverUrl } from "../data/serverUrl";

const LoginModal = () => {
  const { id, jwt } = useParams();
  const { themeConfig } = useContext(themeContext);
  const { setUserId } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id && jwt) {
      setUserId(id);
      localStorage.setItem("jwt", jwt);
      navigate("/account");
    }
  }, []);

  return (
    <motion.div
      className={"relative w-full h-full grid place-items-center"}
      variants={pageVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <div
        className={"absolute top-0 left-0 w-full h-full bg-black opacity-80"}
      ></div>
      <div
        className={`w-fit -skew-x-12 ${themeConfig.neon} ${themeConfig.info} py-5 border-2 px-5`}
      >
        <div className={"mx-auto flex flex-col gap-10"}>
          <Input
            placeholder={"example@gmail.com"}
            changeHandler={({ currentTarget: { value } }) => {
              setEmail(value);
            }}
            labelText={"Login"}
          />
          <Input
            placeholder={"*********"}
            changeHandler={({ currentTarget: { value } }) => {
              setPassword(value);
            }}
            type={"password"}
            labelText={"Password"}
          />
          <div className={"flex justify-between items-center gap-2"}>
            <Button
              handler={() => {
                fetch(serverUrl + "/user/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({ login: email, password: password }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setUserId(data.id);
                    localStorage.setItem("jwt", data.token);
                  })
                  .then(() => {
                    navigate("/");
                  });
              }}
              buttonClassName="hover:shadow-buttonHover_md hover:shadow-blue-500 transition-all duration-500 hover:text-white bg-purple-300"
            >
              Log in
            </Button>
            <a href={serverUrl + "/auth/google_oauth2"}>
              <FcGoogle className={"text-7xl stroke-black stroke-1"} />
            </a>
            <Link to={"/signUp"} className={"text-title-md text-nowrap"}>
              ... or Sign Up
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginModal;
