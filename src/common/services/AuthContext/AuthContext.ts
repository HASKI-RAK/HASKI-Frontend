import { createContext } from "react";
export type AuthContextType = {
    isAuth: boolean,
    setIsAuth: (value: boolean) => void,
    logout: () => void,
};
export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: function (active: boolean) { this.isAuth = active; },
    logout: () => { return; },
});
export default AuthContext;