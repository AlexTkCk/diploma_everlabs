import React, {createContext, useEffect, useState} from "react";
import {TThemeColor, TThemeConfig, TThemeContext} from "../types";
import {themeStyles} from "../styles/themeStyles";

type TThemeProvider = {
    children: React.ReactNode[] | React.ReactNode
}

export const themeContext = createContext<TThemeContext>(
    {
        themeConfig:
        {
            primary: 'bg-green-950',
            secondary: 'bg-green-400',
            accent: 'bg-green-200',
        },
    setTheme: () => {}});

function ThemeProvider ({children}: TThemeProvider) {

    const [themeValue, setTheme] = useState<TThemeColor>('green');
    const [themeConfig, setThemeConfig] = useState<TThemeConfig>(themeStyles[themeValue]);

    useEffect(() => {
        setThemeConfig(themeStyles[themeValue])
    }, [themeValue])

    return (
        <themeContext.Provider value={{themeConfig, setTheme}}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider;