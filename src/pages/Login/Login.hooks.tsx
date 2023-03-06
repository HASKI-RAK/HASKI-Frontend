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