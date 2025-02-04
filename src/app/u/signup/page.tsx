'use client'

import { useAppContext } from '@/app/context/AppContext';
import React from 'react';

const page = () => {

    const { userName,
        setUserName,
        email, setEmail,
        password, setPassword,
        role, setRole,
        userSignup, } = useAppContext()


    return (
        <>
            <h1 className='flex items-center justify-center'>Signup page</h1>
            <div className='flex flex-col gap-y-5 container items-center justify-center text-black'>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="name" id="name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                <input value={role} onChange={(e) => setRole(e.target.value)} type="text" name="role" id="role" />

                <button onClick={userSignup} className='w-10 bg-red-200 text-black'>
                    ok
                </button>
            </div>
        </>
    );
}

export default page;
