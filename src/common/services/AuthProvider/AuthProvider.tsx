import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../AuthContext';
type AuthProviderProps = {
    children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState(false);

    const logout = () => {
        fetch(`http://fakedomain.com:5000/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'text/html'
            }
        }).then((response) => {
            if (response.status === 200) {
                setIsAuth(false);
                clearCookie();
            }
        })
    }

    const clearCookie = () => {
        document.cookie = "haski_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    // middleware to check if user is logged in by asking backend
    useEffect(() => {
        fetch(`http://fakedomain.com:5000/loginstatus`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'text/html'
            }
        }).then((response) => {
            // When the user is logged in, the backend will return 200, otherwise 401 and clear the cookie
            if (response.status === 200) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
                // clear cookie haski_state
                clearCookie();
            }
        })
    }, []);
    const useAuthWrapper = useMemo(() => ({ isAuth, setIsAuth, logout }), [isAuth]);
    return (
        <AuthContext.Provider value={useAuthWrapper}>{props.children}</AuthContext.Provider>
    );
};

