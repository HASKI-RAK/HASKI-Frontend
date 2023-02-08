import { createContext } from "react";
export type AuthContextType = {
    isAuth: boolean,
    setIsAuth: (value: boolean) => void,
    logout: () => void,
};
export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: (active: boolean) => active,
    logout: () => { },
});
export default AuthContext;