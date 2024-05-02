import {motion} from 'framer-motion';
import React, {useContext} from 'react';
import {pageVariants} from "../styles/variants";
import Button from "../components/Button";
import ai_img from '../assets/ai.svg'
import racer_img from '../assets/racer.svg'
import versus_img from '../assets/versus.svg'
import {FaFlag} from "react-icons/fa";
import {themeContext} from "../context/ThemeContext";


const Home = () => {
    const {themeConfig} = useContext(themeContext);
    return (
        <motion.div className={'grow overflow-y-hidden flex flex-col'}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            <div className={'my-5 flex justify-between border-t border-b border-black px-5 py-2'}>
                <p className={'text-title-md font-secondary'}>
                    Record your races with <b>PrintRacer Account</b>
                    <br/>
                    <span className={'text-paragraph-lg'}>Save your race history, compare and improve your skills</span>
                </p>
                <Button handler={() => {}}>
                    Create account
                </Button>
            </div>

            <div className={'relative w-full h-1/3 bg-green-200'}>
                {/*There will be a video background, solid bg for now*/}
            </div>

            <div className={'py-5 grow flex justify-center gap-10'}>
                <div className={`skew-x-[30deg] h-full w-1/4 ${themeConfig.secondary} flex flex-col items-center justify-evenly py-2 ${themeConfig.hoverNeon} transition duration-200 hover:scale-110`}>
                    <h1 className={'-skew-x-[30deg] font-primary text-title-lg w-full px-10'}>Typing Test</h1>
                    <p className={'-skew-x-[30deg] font-secondary text-paragraph-lg w-full px-16'}>Improve your typing skills on your own</p>
                    <div className={'-skew-x-[30deg] flex gap-5 px-16'}>
                        <img className={'w-1/4 aspect-square '} src={racer_img}/>
                        <img className={'w-1/4 aspect-square'} src={versus_img}/>
                        <img className={'w-1/4 aspect-square'} src={ai_img}/>
                    </div>
                    <span className={'-skew-x-[30deg]'}>
                        <Button handler={() => {}}>
                            Practise
                            <FaFlag className={'text-button'}/>
                        </Button>
                    </span>
                </div>
                <div className={`skew-x-[30deg] h-full w-1/4 ${themeConfig.secondary} flex flex-col items-center justify-evenly py-2 ${themeConfig.hoverNeon} transition duration-200 hover:scale-110`}>
                    <h1 className={'-skew-x-[30deg] font-primary text-title-md w-full px-10'}>Race your friends</h1>
                    <p className={'-skew-x-[30deg] font-secondary text-paragraph-lg w-full px-16'}>Create your own racetrack and play with friends</p>
                    <div className={'-skew-x-[30deg] flex gap-5 px-16'}>
                        <img className={'w-1/4 aspect-square'} src={racer_img}/>
                        <img className={'w-1/4 aspect-square'} src={versus_img}/>
                        <img className={'w-1/4 aspect-square'} src={racer_img}/>
                    </div>
                    <span className={'-skew-x-[30deg]'}>
                        <Button handler={() => {}}>
                            Challenge
                            <FaFlag className={'text-button'}/>
                        </Button>
                    </span>
                </div>
            </div>

        </motion.div>
    );
};

export default Home;