import React, {useContext} from 'react';
import ThemeButton from "./ThemeButton";
import {themeContext} from "../context/ThemeContext";

const Footer = () => {

    const {themeConfig} = useContext(themeContext);

    return (
        <div className={`flex justify-between ${themeConfig.primary} px-5 py-3 items-center z-10`}>
            <p className={'font-secondary text-paragraph-lg text-white'}>© 2024 Pensil Games, Inc</p>
            <div className={'rounded-lg border border-white px-3 py-2 flex gap-3'}>
                <ThemeButton bgColor={'green'} />
                <ThemeButton bgColor={'red'} />
                <ThemeButton bgColor={'yellow'} />
                <ThemeButton bgColor={'blue'} />
                <ThemeButton bgColor={'black'} />
            </div>
        </div>
    );
};

export default Footer;