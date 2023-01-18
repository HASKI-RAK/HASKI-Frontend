import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../AuthContext';
export const AuthProvider = ({ children }: any) => {
    const [isAuth, setIsAuth] = useState(false);
    const useAuthWrapper = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);
    return (
        <AuthContext.Provider value={useAuthWrapper}>{children}</AuthContext.Provider>
    );
};