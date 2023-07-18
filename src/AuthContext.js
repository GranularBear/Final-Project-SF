import React, { useState, createContext, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [userData, setUserData] = useState(null);

    const getUserInfo = async (accessToken) => {
        setLoadingUserData(true);

        const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (response.status === 200) {
            const userInfo = await response.json();
            setUserData(userInfo);
            setLoadingUserData(false);
        } else {
            console.error('Failed to fetch user information');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const expire = localStorage.getItem('expire');

        const expireTime = new Date(expire).getTime();

        if (token && expireTime > Date.now()) {
            setIsLoggedIn(true);
            getUserInfo(token);
        } else {
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expire');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, loadingUserData, setLoadingUserData, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);