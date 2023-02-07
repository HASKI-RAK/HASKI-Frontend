import { useMemo, useState } from "react";

export const useLoginForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({ "user": "test", "id": -1 });
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handlers = useMemo(() => ({
        setLoggedInHandler: (value: boolean) => {
            setLoggedIn(value);
        },
        setDataHandler: (value: { "user": string, "id": number }) => {
            setData(value);
        },
        setUsernameHandler: (value: string) => {
            setUsername(value);
        },
        setPasswordHandler: (value: string) => {
            setPassword(value);
        },
        setUsernameErrorHandler: (value: boolean) => {
            setUsernameError(value);
        },
        setPasswordErrorHandler: (value: boolean) => {
            setPasswordError(value);
        }
    }), []);


    return [
        loggedIn,
        data,
        password,
        username,
        usernameError,
        passwordError,
        handlers
    ] as const;
}