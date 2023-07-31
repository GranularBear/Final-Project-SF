import React, { useState, createContext, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const [loadingUserData, setLoadingUserData] = useState(true);
    const [userData, setUserData] = useState(null);

    const [loadingHistogram, setLoadingHistogram] = useState(false);
    const [histogramData, setHistogramData] = useState(null);

    const [isScanAttempted, setIsScanAttempted] = useState(false);

    const [documentIDs, setDocumentIDs] = useState([]);
    const [visibleDocuments, setVisibleDocuments] = useState([]);
    const [currentDocumentPage, setCurrentDocumentPage] = useState(0);

    const getUserInfo = async () => {
        setLoadingUserData(true);

        const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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

    const loadDocuments = async () => {
        const IDsToLoad = documentIDs.slice(currentDocumentPage * 10, (currentDocumentPage + 1) * 10).map(item => item.encodedId);

        const response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ids: IDsToLoad})
        });
        
        if (response.status === 200) {
            const data = await response.json();
            const validDocs = data.filter(doc => doc.ok);
            setVisibleDocuments([...visibleDocuments, ...validDocs]);
            setCurrentDocumentPage(prevPage => prevPage + 1);
        } else {
            console.error('Failed to retrieve the documents');
        }

    };

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

    useEffect(() => {
        if(documentIDs.length > 0) {
            loadDocuments();
        }
    }, [documentIDs])

    return (
        <AuthContext.Provider value={{
            isLoggedIn, setIsLoggedIn,
            userData, setUserData,
            loadingUserData, setLoadingUserData,
            getUserInfo,
            loadingHistogram, setLoadingHistogram,
            histogramData, setHistogramData,
            isScanAttempted, setIsScanAttempted,
            documentIDs, setDocumentIDs,
            visibleDocuments, setVisibleDocuments,
            currentDocumentPage, setCurrentDocumentPage,
            loadDocuments,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);