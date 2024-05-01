import React from "react";
import AnimRoutes from "./components/AnimRoutes";
import {BrowserRouter as Router, Link} from "react-router-dom";
import logo from './assets/logo.svg';
import CustomLink from "./components/CustomLink";
import { FaRobot } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import ThemeButton from "./components/ThemeButton";



function App() {
    return (
        <Router>
            <div className={'flex overflow-hidden h-screen w-screen flex-col'}>
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
                <AnimRoutes/>
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
            </div>
        </Router>
    );
}

export default App;
