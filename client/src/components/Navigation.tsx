import React from 'react';
import {Link} from "react-router-dom";
import logo from "../assets/logo.svg";
import CustomLink from "./CustomLink";
import {FaRobot, FaUsers} from "react-icons/fa";
import {MdLeaderboard} from "react-icons/md";
import {BiSolidUserAccount} from "react-icons/bi";

const Navigation = () => {
    return (
        <div className={'bg-[#339989] px-3 py-2 flex items-center'}>
            <Link to={'/'}><img src={logo} alt="" className={'h-20'}/></Link>
            <h1 className={'text-label-lg font-light font-secondary w-36 ml-3 border-r border-black'}>Cherkasy Print Racing Club</h1>
            <div className={'flex gap-3 ml-auto px-10 w-fit'}>
                <CustomLink link={'/'} text={'Single player'} icon={FaRobot}/>
                <CustomLink link={'/'} text={'Multiplayer'} icon={FaUsers}/>
                <CustomLink link={'/'} text={'Leaderboard'} icon={MdLeaderboard}/>
                <CustomLink link={'/account'} text={'Account'} icon={BiSolidUserAccount}/>
            </div>
        </div>
    );
};

export default Navigation;