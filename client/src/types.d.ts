import {Dispatch, SetStateAction} from "react";

export type TThemeColor = 'green' | 'red' | 'blue' | 'yellow' | 'black';

export type TThemeContext = {
    themeValue: TThemeColor;
    themeConfig: TThemeConfig;
    setThemeValue: Dispatch<SetStateAction<TThemeColor>>;
}

export type TThemeConfig = {
    primary: string,
    secondary: string,
    accent: string,
    neon: string,
    hoverNeon: string,
    info: string,
}

export type TUserData = {
    name: string;
    about: string,
    imageUrl: string,
    created_at: string,
    races_amount: number,
} | null;
