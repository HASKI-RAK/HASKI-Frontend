import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, postLogin, postLoginCredentials } from "@services";

export type LoginHookParams = {
    setIsLoading: (isLoading: boolean) => void;
    nonce?: string;
};

export type LoginHookReturn = {
    readonly onSubmit: () => void;
};

/**
 * Hook for the login logic. Handles the login request and redirects to the home page.
 * 
 * @remarks
 * If a nonce is passed, the user can be authenticated with the nonce.
 * If no nonce is passed the user is redirected to the login page without a nonce.
 * 
 * @param params - Contain nonce and setIsLoading
 * @returns {LoginHookReturn} - The login logic.
 */
export const useLogin = (params: LoginHookParams): LoginHookReturn => {

    const authcontext = useContext(AuthContext);
    const navigate = useNavigate();

    const login = () => {
        // supply auth context
        authcontext.setIsAuth(true);
        // then redirect to home page
        navigate('/dashboard', { replace: true });
    }


    // Login with username and password
    const onSubmitHandler = () => {
        params.setIsLoading(true);
        postLoginCredentials().then((response) => {
            if (response.status === 200) {
                login();
            }

            //TODO catch and🍿 snackbar
        }).finally(() => {
            params.setIsLoading(false);
        });
    };


    // on mount, read search param 'nounce' and set it to state
    useEffect(() => {
        postLogin({ nonce: params.nonce }).then((response) => {
            if (response.status === 200)
                login();
            else
                navigate('/login', { replace: true });

            //TODO 🍿 snackbar
        })
    }, []);

    return {
        onSubmit: onSubmitHandler,
    } as const;
}