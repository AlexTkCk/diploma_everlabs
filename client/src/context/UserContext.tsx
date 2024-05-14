import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {TUserData} from "../types";
import {v4 as uuid4} from 'uuid';
import {serverUrl} from "../data/serverUrl";

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

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            fetch(serverUrl + '/re-entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({'token': jwt})
            }).then(res => res.json()).then(data => {
                setUserId(data.id);
                setUserData({
                    name: data.name,
                })
            })
        }
    }, []);

    return (
        <userContext.Provider value={{userId, userData, setUserId, setUserData}}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;