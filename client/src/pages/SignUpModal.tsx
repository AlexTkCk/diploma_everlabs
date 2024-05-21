import React, {useContext, useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import {themeContext} from "../context/ThemeContext";
import {pageVariants} from "../styles/variants";
import { motion } from "framer-motion";
import {userContext} from "../context/UserContext";
import {useNavigate} from "react-router";
import {serverUrl} from "../data/serverUrl";

const SignUpModal = () => {

    const {themeConfig} = useContext(themeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
                        changeHandler={({currentTarget: {value}}) => {setPassword(value)}}
                        labelText={"Password"}
                        type={'password'}
                    />
                    <Input
                        placeholder={"*********"}
                        changeHandler={({currentTarget: {value}}) => {setConfirmPassword(value)}}
                        labelText={"Confirm pass"}
                        type={'password'}
                    />
                    <div className={"flex justify-center items-center gap-5"}>
                        <Button
                            handler={() => {
                                if (password === confirmPassword) {
                                    fetch(serverUrl + '/user/signup', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'ngrok-skip-browser-warning': 'true',
                                            'Accept': 'application/json',
                                        },
                                        body: JSON.stringify({'login': email, 'password': password})
                                    }).then(res => res.json()).then(data => {
                                        setUserId(data.id);
                                        localStorage.setItem('jwt', data.token);
                                    }).then(() => {
                                        navigate('/');
                                    })
                                }
                            }}
                            buttonClassName="hover:shadow-buttonHover hover:shadow-blue-500 transition-all duration-500 hover:text-white bg-purple-300"
                        >
                            Sign up
                        </Button>
                        <a href={serverUrl + '/auth/google_oauth2'}>
                            <FcGoogle className={"text-7xl stroke-black stroke-1"} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SignUpModal;
