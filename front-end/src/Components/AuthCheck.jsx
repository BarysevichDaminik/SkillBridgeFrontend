import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenFromCookies } from './utils/cookieUtils';

const AuthCheck = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = getAccessTokenFromCookies();
            if (!accessToken) {
                navigate('/signin');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('https://localhost:7168/Auth/authWithToken',{
                    method: 'POST'
                });

                if (response.ok) {
                    navigate('/main');
                } else {
                    navigate('/guest');
                }
            } catch (error) {
                navigate('/guest');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    return isLoading ? <div>Loading...</div> : null;
};

export default AuthCheck;