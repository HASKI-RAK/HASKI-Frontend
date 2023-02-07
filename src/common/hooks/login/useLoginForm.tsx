import { useMemo, useState } from "react";
const useError = <T extends string | number | boolean>(initialValue: T) => {
    const [error, setError] = useState(initialValue);

    // error change handler with memoization
    const errorChangeHandler = useMemo(() => (value: T) => {
        setError(value);
    }, [error]);

    return [error, errorChangeHandler] as const;
};

export const useLoginForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({ "user": "test", "id": -1 });
    const [password, setPassword] = useState(""); // default value is empty string
    const [username, setUsername] = useState(""); // default value is empty string
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const handleLogin = () => {
        setLoggedInHandler(true);
        // to some sanity checks here
        // then supply data to auth context
        authcontext.setIsAuth(true);
        // then redirect to home page
        navigate('/dashboard', { replace: true });
    }

    const onLoginValidationHandler = () => {
        setUsernameErrorHandler(username.length === 0);
        setPasswordErrorHandler(password.length === 0);

        if (!usernameError && !passwordError)
            onLoginHandler();
    }

    return [
        loggedIn,
        data,
        password,
        username,
        usernameError,
        passwordError,
        { ...handlers }
    ];
}