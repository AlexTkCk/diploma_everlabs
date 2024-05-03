import React, {useContext} from 'react';
import ThemeButton from "./ThemeButton";
import {themeContext} from "../context/ThemeContext";
import {themeStyles} from "../styles/themeStyles";

const Footer = () => {

    const {themeConfig} = useContext(themeContext);

    return (
        <div className={`flex justify-between ${themeConfig.primary} ${themeStyles.themeTransitionStyle} px-5 py-3 items-center`}>
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