import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCheck = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = getTokenFromCookies();
            if (!accessToken) {
                navigate('/signin');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('https://localhost:7186/Auth/authWithToken',{ method: 'POST', credentials: 'include' });
                if (response.ok) { console.log("ok"); navigate('/main'); }
            } 
            catch (error) {} 
            finally { setIsLoading(false); }
        };

        checkAuth();
    }, [navigate]);

    return isLoading ? <div>Loading...</div> : null;
};

const getTokenFromCookies = () => {
    const cookies = document.cookie;
    if (!cookies) {
        return { jwtToken: null, refreshToken: null };
    }

    let jwtToken = null;
    let refreshToken = null;
    const cookieArray = cookies.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.startsWith('jwtToken=')) {
            jwtToken = cookie.substring('jwtToken='.length);
        } else if (cookie.startsWith('refreshToken=')) {
            refreshToken = cookie.substring('refreshToken='.length);
        }
    }

    return { jwtToken: jwtToken, refreshToken: refreshToken };
}

export default AuthCheck;