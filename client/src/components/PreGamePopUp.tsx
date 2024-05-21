import React, {useEffect} from 'react';
import Button from "./Button";
import {useNavigate} from "react-router";

type TPreGamePopUpProps = {
    role: 'host' | 'guest' | undefined | null;
    handler?: () => void;
}

const PreGamePopUp = ({role, handler = () => void(0)}:TPreGamePopUpProps) => {


    const navigate = useNavigate();

    useEffect(() => {
        if (role === null) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }

    }, [])

    return <div className={"absolute z-10 w-full h-full flex flex-col justify-center items-center"}>
        <div
            className={"absolute  top-0 left-0 w-full h-full opacity-90 bg-black"}
        ></div>
        <div className={`rounded-xl z-20 border-4  bg-white border-black grid place-items-center gap-5 p-5`}>
            {role === 'host'
                &&
                <>
                    <h1 className={'text-3xl text-center'}>Press when you are ready!</h1>
                    <Button buttonClassName={'hover:text-white hover:bg-black transition duration-250'} handler={handler}>Start !</Button>
                </>
            }
            {role === 'guest' && <h1 className={'text-3xl text-center'}>Waiting for host to start...</h1>}
            {role === undefined && <h1 className={'text-3xl text-center'}>Checking data...</h1>}
            {role === null && <h1 className={'text-3xl text-center'}>You are not allowed in this room...</h1>}
        </div>
    </div>
    };

export default PreGamePopUp;