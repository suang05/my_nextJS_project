// context/AuthContext.js
'use client'; // Provider ที่ใช้ state/effects ต้องเป็น Client Component

import { createContext, useState, useContext, ReactNode } from 'react';

interface UserData {
    name: string;
    role: string;
    initials: string;
}

const userContext = createContext<UserData>({
    name: "สมชาย ใจดี",
    role: "แอดมิน",
    initials: "ส.จ."
});


interface userProviderProps {
    children: ReactNode; // 'ReactNode' ครอบคลุมทุกอย่างที่ React สามารถ Render ได้
}

export function MyProvider({ children }: userProviderProps) {
    const contextValue: UserData = {
        name: "สมชาย ใจดี",
        role: "แอดมิน",
        initials: "ส.จ."
    };
    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    );
}

export function useMyContext() {
    return useContext(userContext);
}