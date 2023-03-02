import { useState } from "react";

export type useLoginFormHookParams = {
    defaultUsername?: string;
    defaultPassword?: string;
}
export type LoginFormHookReturn = {
    readonly username: string;
    readonly password: string;
    readonly setUsername: (username: string) => void;
    readonly setPassword: (password: string) => void;
    readonly submit: () => void;
    readonly validate: () => readonly [boolean, boolean];
};

export const useLoginForm = (params?: useLoginFormHookParams): LoginFormHookReturn => {
    // Default values
    const { defaultUsername = "",
        defaultPassword = ""
    } = params || {};

    // State data
    const [username, setUsername] = useState(defaultUsername);
    const [password, setPassword] = useState(defaultPassword);

    // Logic
    const onSubmit = () => { return }, onValidate = () => [username.length !== 0, password.length !== 0] as const;

    return {
        username,
        password,
        setUsername,
        setPassword,
        submit: onSubmit,
        validate: onValidate
    } as const;
}