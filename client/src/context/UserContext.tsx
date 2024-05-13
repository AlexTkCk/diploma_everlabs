import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
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

export const jwtData = [
    {
        email: '1',
        jwt: 'ab1c34a',
        id: '1',
        name: 'user1'
    },
    {
        email: '2',
        jwt: 'a21c3ba',
        id: '2',
        name: 'user2'
    }
]


const getDataByJwt = (jwt: string | null): Promise<TUserData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = jwtData.find((user) => user.jwt === jwt) as {name: string};
            if (user)
                resolve({
                    name: user.name,
                })

            resolve(null);
        }, 1000);
    })
}

const UserContext = ({children}: TUserContextProps) => {
    const [userId, setUserId] = useState(uuid4());
    const [userData, setUserData] = useState<TUserData>(null);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        getDataByJwt(jwt).then((data) => {
            setUserData(data);
        })
        console.log(jwtData)
    }, [userId]);

    return (
        <userContext.Provider value={{userId, userData, setUserId, setUserData}}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;