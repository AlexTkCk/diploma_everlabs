import React, {useEffect, useRef, useState} from 'react';
import {pageVariants} from "../styles/variants";
import {motion} from "framer-motion";
import { GiFullMotorcycleHelmet as Helmet } from "react-icons/gi";
import {FaFlag} from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ,.:;-'

enum charStateEnum {
    CORRECT,
    WRONG,
    NEUTRAL
}

const charStateMap = {
    [charStateEnum.CORRECT]: 'text-green-500',
    [charStateEnum.WRONG]: 'text-white bg-red-100',
    [charStateEnum.NEUTRAL]: 'text-white'
}

const plaintext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const GameRoom = () => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const roadRef = useRef<HTMLDivElement>(null);
    const enemyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [fromLeft, setFromLeft] = useState(0);
    const [enemyFromLeft, setEnemyFromLeft] = useState(0);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [caret, setCaret] = useState(0);
    const [text, setText] = useState(plaintext.split('').map(char => ({value: char, state: charStateEnum.NEUTRAL})));

    const [playerSpeed, setPlayerSpeed] = useState(0);
    const [enemySpeed, setEnemySpeed] = useState(0);

    const [charsInARow, setCharsInARow] = useState(0);

    const sendMessage = (symbol: string, trueSymbol: string): void => {
        if (ws) ws.send(JSON.stringify({sym: symbol, trueSym: trueSymbol}))
    }

    useEffect(() => {
        if (containerRef.current) {
            const {width: containerWidth} = containerRef.current.getBoundingClientRect();
            const child = Array.from(containerRef.current.children)[0];
            const {width: childWidth} = child.getBoundingClientRect();
            setCharsInARow(Math.round(containerWidth / childWidth))
        }
    }, [])

    useEffect(() => {
        if (roadRef.current) {
            setFromLeft(prev => prev + playerSpeed)
            roadRef.current.style.marginLeft = '-' + fromLeft + 'px';
        }
    }, [playerSpeed]);

    useEffect(() => {
        if (enemyRef.current) {
            setEnemyFromLeft(prev => prev + enemySpeed - playerSpeed);
            enemyRef.current.style.marginLeft = enemyFromLeft + 'px';
        }
    }, [enemySpeed, playerSpeed]);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const child = Array.from(container.children)[caret];
            if (child) {
                if (caret > charsInARow && caret % charsInARow === 0) {
                    child.scrollIntoView({behavior: 'smooth'})
                }
            }
        }
    })

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            setWs(socket);
        };

        socket.onmessage = (event) => {
            const {owner, speed} = JSON.parse(event.data);
            if (owner === 1)
                setPlayerSpeed(prev => prev + +speed < 0 ? 0 : prev + +speed);
            else
                setEnemySpeed(prev => prev + +speed < 0 ? 0 : prev + +speed);
        };

        socket.onerror = (error) => {
            alert('Web socket server is shut down, run server in src/mockupServer/mockupServer.js')
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);



    let dashes = [];
    for (let i=0; i<1000; i++) {
        dashes.push(<div key={i} className={'bg-white h-2 w-10'}></div>)
    }

    return (
        <motion.div className={'absolute flex flex-col top-0 left-0 w-full h-full bg-white z-10 overflow-x-hidden'}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            <div className={'h-3/5 bg-black relative grid place-items-center'}>
                <div ref={enemyRef} className={'absolute top-2 left-10 transition-all duration-500 ease-linear'}>
                    <FaCarSide className={'text-[300px] text-white bg-none'}/>
                </div>
                <div ref={roadRef} className={'absolute flex gap-5 top-[50%] transition-all duration-500 ease-linear'}>
                    {dashes.map(dash => dash)}
                </div>
                <div className={'absolute left-10 bottom-1'}>
                    <FaCarSide className={'text-[300px] text-white bg-none'}/>
                </div>
            </div>
            <div className={'flex w-full px-5 py-2 justify-evenly mb-2'}>
                <div className={'flex gap-2 px-2 py-2 border border-black items-center'}>
                    <Helmet className={'text-black text-5xl scale-x-[-1]'}/>
                    <h1 className={'font-primary text-5xl'}>Racer num 1</h1>
                </div>
                <div className={'rounded-full h-full aspect-square border border-black grid place-items-center px-5'}>
                    <h1 className={'text-5xl font-primary'}>30</h1>
                </div>
                <div className={'flex flex-row-reverse gap-2 px-2 py-2 border border-black items-center'}>
                    <Helmet className={'text-black text-5xl'}/>
                    <h1 className={'font-primary text-5xl'}>Racer num 2</h1>
                </div>
            </div>
            <div onClick={() => {
                textAreaRef.current?.focus()
            }} className={`relative mx-auto group p-5 w-2/3 bg-black text-white border border-black h-52 shadow-neon-inner text-wrap font-primary rounded-xl overflow-y-scroll scroll-hidden`}>
                <textarea
                    ref={textAreaRef}
                    onKeyDown={e => {
                        const key = e.key;
                        if (!alphabet.includes(key)) return;
                        setCaret(prev => prev + 1);
                        setText(prev => {
                            return prev.map((symbol, index) => {
                                if (index === caret) {
                                    sendMessage(key, symbol.value);
                                    return {
                                        state: key === symbol.value ? charStateEnum.CORRECT : charStateEnum.WRONG,
                                        value: symbol.value
                                    }
                                }
                                return {
                                    ...symbol
                                }
                            })
                        })
                    }}
                    className={'absolute opacity-0 w-0 h-0'}></textarea>
                <div ref={containerRef} className={'text-3xl text-justify font-primary relative text-wrap overflow-y-scroll'}>
                    {text.map(({value, state}, index) => <span key={index} className={`${charStateMap[state]} ${index === caret ? 'border-l border-white caret_here' : ''} transition duration-250 ease-linear`}>{value}</span>)}
                </div>
            </div>
            <button className={'mx-auto mb-10 grid place-items-center bg-red-600 rounded-xl w-1/5 py-5 border border-black'}><FaFlag className={'text-white text-5xl text-center'}/></button>
        </motion.div>
    );
};

export default GameRoom;