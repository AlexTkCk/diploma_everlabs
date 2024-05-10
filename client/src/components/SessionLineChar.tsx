import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

interface SessionData {
    sps: number;
    accuracy: number;
}

interface SessionLineChartProps {
    sessionData: SessionData[];
}

const SessionLineChart = ({ sessionData } : SessionLineChartProps) => {
    return (
        <ResponsiveContainer width={500} height={500} className={`bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            <LineChart data={sessionData}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid />
                <Tooltip />
                <Line type="monotone" dataKey="sps" stroke="#4caf50" />
                <Line
                    type="monotone"
                    dataKey="accuracy"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SessionLineChart;

