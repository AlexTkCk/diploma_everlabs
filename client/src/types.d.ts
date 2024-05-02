import {Dispatch, SetStateAction} from "react";

export type TThemeColor = 'green' | 'red' | 'blue' | 'yellow' | 'black';

export type TThemeContext = {
    themeConfig: TThemeConfig;
    setTheme: Dispatch<SetStateAction<TThemeColor>>;
}

export type TThemeConfig = {
    primary: string,
    secondary: string,
    accent: string,
}
