import React, {createContext, useEffect, useState} from 'react';
import {TUser} from "../types";

type TUserContextProps = {
    children: React.ReactNode;
}

const userContext = createContext<TUser>(null);

const UserContext = ({children}: TUserContextProps) => {
    const [user, setUser] = useState<TUser>(null);

    useEffect(() => {

    }, []);

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;