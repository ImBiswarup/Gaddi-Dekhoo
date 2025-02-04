'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { redirect } from "next/dist/server/api-utils";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('customer')
    const [user, setUser] = useState([])

    const userSignup = async () => {
        const res = await axios.post('/api/user/signup', {
            name: userName,
            email, password, role
        })
        setUser(res.data)
        console.log(res.data);
    }

    const userLogin = async () => {
        const res = await axios.post('/api/user/signin', {
            email, password
        })
        console.log(res.data);
    }

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];

        if (token) {
            const decodedUser = jwtDecode(token); // ✅ Decode token
            setUser(decodedUser);
        }
    }, []);
    return (
        <AppContext.Provider value={{
            userName,
            setUserName,
            email, setEmail,
            password, setPassword,
            role, setRole,
            user, setUser,
            userLogin, userSignup
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

