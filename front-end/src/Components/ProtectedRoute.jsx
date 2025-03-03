import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkAuth from './AuthCheck.jsx';
import MainPage from '../Pages/MainPage.jsx';
import GuestPage from '../Pages/GuestPage.jsx';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const performAuthCheck = async () => {
            const authResult = await checkAuth(navigate);
            setIsAuthenticated(authResult);
        };
        performAuthCheck();
    }, [navigate]);

    if (isAuthenticated === null) { return null; }

    if (isAuthenticated === true) {
        return <MainPage {...rest} />;
    } else {
        if (Component === MainPage) {
            return <GuestPage {...rest} />;
        } else {
            return <Component {...rest} />;
        }
    }
};

export default ProtectedRoute;