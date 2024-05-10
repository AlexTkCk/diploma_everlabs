import usersData from './mockupUsers.json';
import {TUser} from "../types";

export const login = (email: string, password: string): Promise<TUser | {message: string}> => {
    return new Promise<TUser>((resolve, reject) => setTimeout(() => {
        const user = usersData.find(user => user.email === email);
        user?.password === password ? resolve(user) : reject({message: 'Invalid credentials'});
    }, 1000))
}