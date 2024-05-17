import React, {useContext, useEffect, useRef, useState} from 'react';
import {pageVariants} from "../styles/variants";
import {motion} from "framer-motion";
import { GiFullMotorcycleHelmet as Helmet } from "react-icons/gi";
import {FaFlag} from "react-icons/fa";
import SessionLineChar, {SessionData} from "../components/SessionLineChar";
import Car from "../components/Car";
import {WSSUrl} from "../data/serverUrl";
import consumer from "../cable";
import {userContext} from "../context/UserContext";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ,.:;-'

enum charStateEnum {
    CORRECT,
    WRONG,
    NEUTRAL
}

const city =
    `
                                                                                                                                 /@@&
                                                                                                                                &////#                ,
                                                                        @                                                       &..../                ,
                                                                      @@@                                                       &&&&&@                @
                                                  #                *@@@@@                                                       &####%                @
                                                  @              @@@@@@@@                                                       &    *               @@@
                                                  @             (@%&@%%@@                                                      @(@ ,@ @            @@@@@@@            @@
                                    @            @@@            (@ ,@  @@                                                      @@@@@@@@            @@@@@@@          @@@@@
                                   @@           @@@@@&          /@/(@//@@                                                      @(@ ,@ @          @@ %@.,@# @       &@@@@@&&
                                  @@@@        %%@@@@@@%,        (@*(@**@@@@   @@@@@@@@                                 ,@&*@*&@@@@@@@@@@@@@@     @@ %@.,@# @       @ ,@ @ @  @@
                              / ,@&(@/@@      @#######@*       /@@.*@.,@@###  @%/*#@@@     @@ @ @@                     ,@&*@*&@@(@ ,@ @..%@@     @@ %@.,@# @       @@@@@@@@  @@@@       @
                            @@@ ,@%*@ @@    ( @       @*    .@@@@@&&@&&@@@@@@@@%/*#@@@     @@ @ @@                     ,@&*@*&@@@@&@@&@  #@@     @@ %@..@% @///    @.,@ @.@   @,(@   *@@@  @#
           *@@        @   @@@@@ ,@%*@ @@    @ @#######@*    @@*  @ ,@  @@.. @@@%/*#@@@     @@ @ @@         @&#%%%@     ,@&*@*&@@(@.*@ @  #@@  @  @@ %@..@% @,,,.   @ ,@ @ @   @,(@  ****@  @#
           *@@@@     @@@  @ %&@ ,@%*@ @@   /#,@&&&&&&&@*    @@@@@@@@@@@@@&&&@@@%/*#@@@     @@ @ @@    @    @%#%%%@  @  ,@&*@*&@@%@/#@/@  #@@ @@@ @@ %@..@% @@@@@@@@@@@@@@@@   @,(@  .   @ &%%
  (        *@ *@    @%%%@ @ %&@ ,@%*@ @@@@@#%(@.......@*    @@/,,@ ,@  @@%%%@@@%/*#@@@     @@ @ @@   @@@   @&#%%%@  @  ,@&*@*&@@#@*(@*@  #@@%///@@@ %@..@% @///@,%@@#%@#@(@   @,(@  ****@ %%%
  #        *@.(@@,,*@%%%@ @ %&@ ,@%*@ @&%%@&&%@@@@@@@@@*%%% @@(,,@@@@@@@@   @@@%/*#@@@@@@  @@ @ @@#&/*@#/##@&#%%%@  @@@,@&*@*&@@(@ *@ @  #@@#,,,@@@ %@..@% @...@*%@@ ,@ @ @@@ @,(@@@@@@@@@&%%@
  #       @%@%&@@&&&@%%%@@@*&&@@@@%*@ @&%%@&&%@#######@@#%%@@@#((@ ,@  @@###@@@%/*#@@@ ,@@@@@ @ @@.@. @/ @#@&#%%%@@@@@@,@&*@*&@@&@#%@#@  #@@#***@@@ %@..@% @@@@@(&@@(#@(@(@@@ @,(@@@@@@@@@&%%@       @@@
  .      ,@&@%&@@..,@%%%@@@(&@@@@@%*@ @(  @@@@@       @@#%%@@@*  @@@@@@@@%%%@@@%/*#@@@@@@@@@@ @ @@.@,.@(.@&@&#%%%@@@@@#,@&*@*&@@(@ ,@ @..%@@(...@@@ %@..@% @***@&@@@@@@@@@@@@ @,(@@@&&&%@@&%%@@%&@   @@@
  %      @@@@,(@@%%%@%%#@@@&@@@@@@%*@ @@@@@@@@@%%%%%%%@@##%@@@@@@@ ,@  @@.. @@@&##%@@@ ,@@@@@ @ @@*@%#@&#@@@&#%%%@@@@@#,@&*@*&@@@@&&@&@**&@@#***@@@.%@,,@%.@,,,@@@@@ ,@ @ @@@.@*#@@@,...@@&%%@@@@@...@@@
  (  //// @%@ /@@@@@@%#%@@@@@@@@@@@@@@@#**@@@@@@@@@@@@@@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @ @@#@&&@&&@@@&#%%%@@@@@&@@@@@@@@@@@@@@@@@@@@@(,,,@@@@@@@@@@@@@@@@@@@@.*@.@.@@@@@@@@@@@@@@@@&%%@@&&@@@@@@@
  #. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*,@(,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@**@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    `


const charStateMap = {
    [charStateEnum.CORRECT]: 'text-green-500',
    [charStateEnum.WRONG]: 'text-white bg-red-100',
    [charStateEnum.NEUTRAL]: 'text-white'
}

const plaintext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const timeDuration = 30;
const GameRoom = () => {

    const {userId} = useContext(userContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const roadRef = useRef<HTMLDivElement>(null);
    const enemyRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [fromLeft, setFromLeft] = useState(0);
    const [enemyFromLeft, setEnemyFromLeft] = useState(0);
    const [ws, setWs] = useState<any | null>(null);
    const [caret, setCaret] = useState(0);
    const [text, setText] = useState(plaintext.split('').map(char => ({value: char, state: charStateEnum.NEUTRAL})));

    const [playerSpeed, setPlayerSpeed] = useState(0);
    const [enemySpeed, setEnemySpeed] = useState(0);

    const [charsInARow, setCharsInARow] = useState(0);

    const [timer, setTimer] = useState(timeDuration);

    const [sessionData, setSessionData] = useState({correctSymbols: 0, totalSymbols: 0});
    const [sessionChartData, setSessionChartData] = useState<SessionData[] | []>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sendMessage = (symbol: string, trueSymbol: string): void => {
        if (ws) {
            ws.perform('speed', {user_id: userId, room_id: 9, valid: symbol === trueSymbol});
        }
    }

    useEffect(() => {
        if (ws) {
            setInterval(() =>  {
                ws.perform('speed_slow', {user_id: userId, room_id: 9});
            }, 100);
        }
    }, [ws])

    useEffect(() => {
        setSessionChartData(prev => [...prev, {
            name: Math.abs(timer - timeDuration) + 's',
            sps: Math.round(sessionData.totalSymbols / (Math.abs(timer - timeDuration) + 0.0000001) * 100) / 100,
            accuracy: Math.round(sessionData.correctSymbols / (sessionData.totalSymbols / 100 + 0.0000000001) * 100) / 100
        }])
    }, [timer])


    useEffect(() => {
        const timerInterval = setInterval((() => {
            let innerTimer = timeDuration;
            return () => {
                setTimer(prev => prev - 1 < 0 ? 0 : prev - 1);
                innerTimer--;
                if (innerTimer === 0) {
                    clearInterval(timerInterval);
                    setIsModalOpen(true);
                    if (textAreaRef.current)
                        textAreaRef.current.disabled = true;
                }
            }
        })(), 1000);

        if (containerRef.current) {
            const {width: containerWidth} = containerRef.current.getBoundingClientRect();
            const child = Array.from(containerRef.current.children)[0];
            const {width: childWidth} = child.getBoundingClientRect();
            setCharsInARow(Math.round(containerWidth / childWidth))
        }

        const subscription = consumer.subscriptions.create(
            { channel: "RaceChannel", room_id: 9 },
            {
                connected() {
                    console.log(`Connected to RaceChannel for room ${9}`);
                },

                disconnected() {
                    console.log(`Disconnected from RaceChannel for room ${9}`);
                },

                received(data: any) {
                    const {user_id, speed_change} = data;
                    setPlayerSpeed(prev => prev + speed_change < 0 ? 0 : prev + speed_change);
                }
            }
        );
        setWs(subscription);
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    useEffect(() => {
        if (roadRef.current) {
            setFromLeft(prev => prev + playerSpeed);
            roadRef.current.style.marginLeft = '-' + fromLeft + 'px';
        }
    }, [playerSpeed]);

    useEffect(() => {
        if (enemyRef.current) {
            setEnemyFromLeft(prev => prev + enemySpeed - playerSpeed);
            enemyRef.current.style.marginLeft = enemyFromLeft + 'px';
        }
    }, [enemySpeed]);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const child = Array.from(container.children).find(child => child.classList.contains('caret_here'));
            if (child) {
                const {left, height} = child.getBoundingClientRect();
                if (caret > charsInARow && Math.round(container.getBoundingClientRect().left) === Math.round(left)) {
                    container.style.bottom = (parseInt(container.style.bottom) + height) + 'px';
                }
            }

        }
    }, [caret])

    return (
        <motion.div className={'absolute flex flex-col top-0 left-0 w-full h-full bg-white z-10 overflow-x-hidden'}
                    variants={pageVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}>
            <div className={'h-3/5 bg-black flex flex-col relative'}>
                <div ref={roadRef}  className={`flex transition w-fit duration-150 ease-linear`}>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                    <pre className={'text-[6px] text-white'}>{city}</pre>
                </div>
                <hr className={'w-screen h-0.5 bg-white'}/>
                <div className={'flex items-center flex-col'}>
                    <div ref={enemyRef} className={'transition-all duration-500 ease-linear'}>
                        <Car speed={enemySpeed}/>
                    </div>
                    <div ref={playerRef} className={'transition-all duration-1000 ease-linear'}>
                        <Car speed={playerSpeed}>
                            <span className={'absolute bottom-full text-center left-0 w-1/2 border-white border bg-black text-white p-1 text-sm'}>You</span>
                        </Car>
                    </div>

                </div>

            </div>
            <div className={'flex w-full px-5 py-2 justify-evenly mb-2'}>
                <div className={'flex gap-2 px-2 py-2 border border-black items-center'}>
                    <Helmet className={'text-black text-5xl scale-x-[-1]'}/>
                    <h1 className={'font-primary text-5xl'}>Racer num 1</h1>
                </div>
                <div className={'rounded-full h-full aspect-square border border-black grid place-items-center px-5'}>
                    <h1 className={'text-5xl font-primary'}>{timer}</h1>
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
                                    setSessionData(prev => ({
                                        ...prev,
                                        correctSymbols: prev.correctSymbols + +(key === symbol.value),
                                        totalSymbols: prev.totalSymbols + 1
                                    }))
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
                <div ref={containerRef} style={{bottom: 0}} className={'text-3xl transition-all duration-250 ease-linear absolute w-full h-full bottom-0 left-0 text-justify font-primary relative text-wrap'}>
                    {text.map(({value, state}, index) => <span key={index} className={`${charStateMap[state]} ${index === caret ? 'border-l border-white caret_here' : ''} transition duration-250 ease-linear`}>{value}</span>)}
                </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className={'mx-auto mb-10 grid place-items-center bg-red-600 rounded-xl w-1/5 py-5 border border-black'}><FaFlag className={'text-white text-5xl text-center'}/></button>
            {isModalOpen &&
                <SessionLineChar sessionData={sessionChartData}></SessionLineChar>
            }
        </motion.div>
    );
};

export default GameRoom;