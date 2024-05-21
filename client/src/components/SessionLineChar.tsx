import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { themeContext } from "../context/ThemeContext";
import Button from "./Button";
import { useNavigate } from "react-router";

export interface SessionData {
  sps: number;
  accuracy: number;
  name: string;
}

interface SessionLineChartProps {
  sessionData: SessionData[];
  leaveHandler: () => void
}


const SessionLineChart = ({sessionData, leaveHandler}: SessionLineChartProps) => {
    const navigate = useNavigate();
    const {themeConfig} = useContext(themeContext);
    return (
        <div className={"absolute w-full h-full flex flex-col pt-20 items-center"}>
            <div
                className={"absolute top-0 left-0 w-full h-full opacity-90 bg-black"}
            ></div>
            <h1
                className={`text-white text-8xl ${themeConfig.primary} rounded-xl px-5 py-5 my-12 shadow-white shadow-lg font-secondary z-10`}
            >
                Results
            </h1>
            <div className={'flex h-1/2 w-full justify-center items-center gap-5 z-10'}>
                <div className={'h-full w-1/3'}>
                    <h1 className={'text-3xl font-primary text-white'}>Accuracy</h1>
                    <ResponsiveContainer
                        width={"100%"}
                        height={"100%"}
                        className={`px-5 py-5 border ${themeConfig.primary}  border-white border-2 rounded-xl ${themeConfig.neon}`}
                    >
                        <LineChart title={'Accuracy'} data={sessionData}>
                            <XAxis dataKey={"name"}/>
                            <CartesianGrid/>
                            <Tooltip/>
                            <Line
                                type="monotone"
                                dataKey="accuracy"
                                stroke="#1d4ed8"
                                strokeWidth={5}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={'h-full w-1/3'}>
                    <h1 className={'text-3xl font-primary text-white text-right'}>Symbols per second</h1>
                    <ResponsiveContainer
                        width={"100%"}
                        height={"100%"}
                        className={`z-10 px-5  py-5 border ${themeConfig.primary}  border-white border-2 rounded-xl ${themeConfig.neon}`}
                    >
                        <LineChart title={'Symbols per second'} data={sessionData}>
                            <XAxis dataKey={"name"}/>
                            <CartesianGrid/>
                            <Tooltip/>
                            <Line
                                type="monotone"
                                dataKey="sps"
                                stroke="#1d4ed8"
                                strokeWidth={5}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <Button
                buttonClassName={`z-10 hover:shadow-buttonHover_lg hover:shadow-red-500 transition-all duration-500 ${themeConfig.accent} mt-5`}
                handler={() => {
                    leaveHandler();
                    navigate("/");
                }}
            >
                Leave the race
            </Button>
        </div>
    );
};

export default SessionLineChart;
