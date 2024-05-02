import React from 'react';
import ThemeButton from "./ThemeButton";

const Footer = () => {
    return (
        <div className={'flex justify-between bg-[#151E17] px-5 py-3 items-center'}>
            <p className={'font-secondary text-paragraph-lg text-white'}>© 2024 Pensil Games, Inc</p>
            <div className={'rounded-lg border border-white px-3 py-2 flex gap-3'}>
                <ThemeButton bgColor={'green'} handler={() => {}} isActive={true}/>
                <ThemeButton bgColor={'red'} handler={() => {}} isActive={false}/>
                <ThemeButton bgColor={'yellow'} handler={() => {}} isActive={false}/>
                <ThemeButton bgColor={'blue'} handler={() => {}} isActive={false}/>
                <ThemeButton bgColor={'black'} handler={() => {}} isActive={false}/>
            </div>
        </div>
    );
};

export default Footer;