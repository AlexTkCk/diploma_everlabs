import React from 'react';
import ThemeButton from "./ThemeButton";

const Footer = () => {
    return (
        <div className={'flex justify-between bg-[#151E17] px-5 py-3 items-center'}>
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