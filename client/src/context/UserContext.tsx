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
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            fetch(serverUrl + `/re-entry?token=${jwt}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Accept': 'application/json',
                },
            }).then(res => res.json()).then(data => {
                if (data.id) {
                    setUserId(data.id);
                    setUserData({
                        name: data.name,
                        about: data.descriptions,
                        imageUrl: data.avatar,
                        races_amount: data.count_race,
                        created_at: data.created_at,
                    })
                }
                setIsFetching(false);
            }).catch(() => {
                setIsFetching(false);
            })
        } else {
            setIsFetching(false);
        }
    }, [userId]);

    if (isFetching)
        return <h1 className={'text-5xl text-center w-full h-full'}>Fetching User Data...</h1>

    return (
        <userContext.Provider value={{userId, userData, setUserId, setUserData}}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;