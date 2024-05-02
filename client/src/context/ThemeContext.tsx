import React, {createContext, useEffect, useState} from "react";
import {TThemeColor, TThemeConfig, TThemeContext} from "../types";
import {themeStyles} from "../styles/themeStyles";

type TThemeProvider = {
    children: React.ReactNode[] | React.ReactNode
}

export const themeContext = createContext<TThemeContext>(
    {
        themeValue: 'green',
        themeConfig:
        {
            primary: 'bg-green-950',
            secondary: 'bg-green-400',
            accent: 'bg-green-200',
            neon: 'shadow-neon-green',
            hoverNeon: 'hover:shadow-neon-green',
        },
        setThemeValue: () => {}});

function ThemeProvider ({children}: TThemeProvider) {

    const [themeValue, setThemeValue] = useState<TThemeColor>('green');
    const [themeConfig, setThemeConfig] = useState<TThemeConfig>(themeStyles[themeValue]);

    useEffect(() => {
        setThemeConfig(themeStyles[themeValue])
    }, [themeValue])

    return (
        <themeContext.Provider value={{themeValue, themeConfig, setThemeValue}}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider;