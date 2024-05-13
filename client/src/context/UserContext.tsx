import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {TUserData} from "../types";
import {v4 as uuid4} from 'uuid';

type TUserContextProps = {
    children: React.ReactNode;
}

type TUserContext = {
    userId: string,
    userData: TUserData,
    setUserId: Dispatch<SetStateAction<string>>,
    setUserData: Dispatch<SetStateAction<TUserData>>,
}

export const userContext = createContext<TUserContext>({
    userId: '',
    userData: null,
    setUserId: () => {},
    setUserData: () => {}
});

const UserContext = ({children}: TUserContextProps) => {
    const [userId, setUserId] = useState(uuid4());
    const [userData, setUserData] = useState<TUserData>(null);

    console.log(userId)

    return (
        <userContext.Provider value={{userId, userData, setUserId, setUserData}}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;