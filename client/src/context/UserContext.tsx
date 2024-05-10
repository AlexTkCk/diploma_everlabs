import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {TUser} from "../types";

type TUserContextProps = {
    children: React.ReactNode;
}

type TUserContext = {
    user: TUser,
    setUser: Dispatch<SetStateAction<TUser>>
}

export const userContext = createContext<TUserContext>({
    user: null,
    setUser: () => {}
});

const UserContext = ({children}: TUserContextProps) => {
    const [user, setUser] = useState<TUser>(null);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;