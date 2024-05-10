import React, {useContext} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import {themeContext} from "../context/ThemeContext";
import Button from "./Button";
import {useNavigate} from "react-router";

export interface SessionData {
    sps: number;
    accuracy: number;
    name: string;
}

interface SessionLineChartProps {
    sessionData: SessionData[];
}

const SessionLineChart = ({ sessionData } : SessionLineChartProps) => {

    const navigate = useNavigate();
    const {themeConfig} = useContext(themeContext);

    return (
        <div className={'absolute w-full h-full flex flex-col pt-20 items-center'}>
            <div className={'absolute top-0 left-0 w-full h-full opacity-90 bg-black'}>

            </div>
            <h1 className={`text-white text-8xl ${themeConfig.primary} rounded-xl px-5 py-5 my-12 shadow-white shadow-lg font-secondary z-10`}>Results</h1>
            <ResponsiveContainer width={'30%'} height={'30%'} className={`z-10 px-5 py-5 border ${themeConfig.primary}  border-white border-2 rounded-xl ${themeConfig.neon}`}>
                <LineChart data={sessionData}>
                    <XAxis dataKey={'name'}/>
                    <CartesianGrid />
                    <Tooltip />
                    <Line type="bump" dataKey="sps" stroke="#65a30d" strokeWidth={5}/>
                    <Line type="monotone" dataKey="accuracy" stroke="#1d4ed8" strokeWidth={5}/>

                </LineChart>
            </ResponsiveContainer>
            <Button buttonClassName={`z-10 ${themeConfig.accent} mt-5`} handler={() => (navigate('/'))}>Leave the race</Button>
        </div>
    );
};

export default SessionLineChart;

