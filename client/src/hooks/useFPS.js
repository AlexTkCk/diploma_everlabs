import { useState, useEffect } from "react";
export default function useFPS () {
    const [frame, setFrame] = useState(0);
    const FPS_RATE = 30;
    useEffect(() => {
        setInterval(() => {
            setFrame(prev => (prev + 1) > FPS_RATE ? 0 : prev + 1);
        }, 1000/FPS_RATE);
    }, [])

    return frame;
};