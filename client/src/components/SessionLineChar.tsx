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

export interface SessionData {
    sps: number;
    accuracy: number;
    name: string;
}

interface SessionLineChartProps {
    sessionData: SessionData[];
}

const SessionLineChart = ({ sessionData } : SessionLineChartProps) => {

    const {themeConfig} = useContext(themeContext);

    return (
        <div className={'absolute w-full h-full grid place-items-center'}>
            <div className={'absolute w-full h-full opacity-80 bg-black'}>

            </div>

            <ResponsiveContainer width={'30%'} height={'30%'} className={`px-2 z-10 py-5 border ${themeConfig.primary} border-white border-2 rounded-xl ${themeConfig.neon}`}>
                <LineChart data={sessionData}>
                    <XAxis dataKey={'name'}/>
                    <CartesianGrid />
                    <Tooltip />
                    <Line type="bump" dataKey="sps" stroke="#65a30d" strokeWidth={5}/>
                    <Line type="monotone" dataKey="accuracy" stroke="#1d4ed8" strokeWidth={5}/>

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SessionLineChart;

