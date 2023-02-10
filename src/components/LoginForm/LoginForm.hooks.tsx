import { useState } from "react";

export type useLoginFormParams = {
    defaultUsername?: string;
    defaultPassword?: string;
    defaultUsernameError?: boolean;
    defaultPasswordError?: boolean;
}
export interface useLoginFormReturn {
    readonly username: string;
    readonly password: string;
    readonly usernameHasError: boolean;
    readonly passwordHasError: boolean;
    readonly setUsername: (username: string) => void;
    readonly setPassword: (password: string) => void;
    readonly setUsernameHasError: (usernameHasError: boolean) => void;
    readonly setPasswordHasError: (passwordHasError: boolean) => void;
};

export const useLoginForm = (params?: useLoginFormParams): useLoginFormReturn => {
    const { defaultUsername = "",
        defaultPassword = "",
        defaultUsernameError = false,
        defaultPasswordError = false
    } = params || {};

    // State
    const [username, setUsername] = useState(defaultUsername);
    const [password, setPassword] = useState(defaultPassword);
    const [usernameHasError, setUsernameHasError] = useState(defaultUsernameError);
    const [passwordHasError, setPasswordHasError] = useState(defaultPasswordError);

    return {
        username,
        password,
        usernameHasError,
        passwordHasError,
        setUsername,
        setPassword,
        setUsernameHasError,
        setPasswordHasError
    } as const;
}