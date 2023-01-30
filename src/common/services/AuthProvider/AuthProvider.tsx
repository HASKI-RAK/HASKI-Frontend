import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../AuthContext';
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
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
                document.cookie = "haski_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const useAuthWrapper = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);
    return (
        <AuthContext.Provider value={useAuthWrapper}>{children}</AuthContext.Provider>
    );
};