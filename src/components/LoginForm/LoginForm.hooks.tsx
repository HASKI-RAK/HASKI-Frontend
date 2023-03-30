import { useState } from "react";

export type useLoginFormHookParams = {
  defaultUsername?: string;
  defaultPassword?: string;
};

export type LoginFormHookReturn = {
  readonly username: string;
  readonly password: string;
  readonly setUsername: (username: string) => void;
  readonly setPassword: (password: string) => void;
  readonly submit: () => void;
  readonly validate: () => readonly [boolean, boolean];
  readonly loginMoodle: () => void;
};

/**
 * Hook for the login form logic. Handles username and password state and
 * provides functions to validate and submit the form.
 * @param params - The default values for the form.
 * @returns {LoginFormHookReturn} - The form logic.
 */
export const useLoginForm = (
  params?: useLoginFormHookParams
): LoginFormHookReturn => {
  // Default values
  const { defaultUsername = "", defaultPassword = "" } = params || {};

  // State data
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);

  // Logic
  const onSubmit = () => {
      return;
    },
    onValidate = () => [username.length !== 0, password.length !== 0] as const;

  const loginMoodle = () => {
    return;
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    submit: onSubmit,
    validate: onValidate,
    loginMoodle,
  } as const;
};
