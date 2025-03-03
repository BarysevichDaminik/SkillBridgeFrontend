const checkAuth = async () => {
    const accessToken = getTokenFromCookies();
    if (!accessToken) { return false; }

    try {
        const response = await fetch('https://localhost:7186/Auth/authWithToken', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.status === 200) { return true; } 
        else { return false; }
    } 
    catch (error) { return false; }
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

export default checkAuth;