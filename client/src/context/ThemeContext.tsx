import React, {createContext, useEffect, useState} from "react";
import {TThemeColor, TThemeConfig, TThemeContext} from "../types";
import {themeStyles} from "../styles/themeStyles";

type TThemeProvider = {
    children: React.ReactNode[] | React.ReactNode
}

export const themeContext = createContext<TThemeContext>(
    {
        themeValue: 'green',
        themeConfig: themeStyles.green,
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