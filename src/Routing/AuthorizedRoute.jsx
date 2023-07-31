import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthorizedRoute = ({ path, element, ...rest }) => {
    const token = localStorage.getItem('accessToken');
    const isAuthorized = token && token !== null ? true : false;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/authorization');
        }
    }, [isAuthorized, navigate])

    return isAuthorized ? <Outlet /> : null;
}

export default AuthorizedRoute;