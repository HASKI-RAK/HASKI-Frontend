import { useState } from 'react'

/**
 * @property {@link useLoginFormHookParams#defaultUsername} - The default value for the username field.
 * @property {@link useLoginFormHookParams#defaultPassword} - The default value for the password field.
 */
export type useLoginFormHookParams = {
  defaultUsername?: string
  defaultPassword?: string
}

/**
 * @property {@link LoginFormHookReturn#username} - The current value of the username field.
 * @property {@link LoginFormHookReturn#password} - The current value of the password field.
 * @property {@link LoginFormHookReturn#setUsername} - Sets the value of the username field.
 * @property {@link LoginFormHookReturn#setPassword} - Sets the value of the password field.
 * @property {@link LoginFormHookReturn#submit} - Submits the form.
 * @property {@link LoginFormHookReturn#validate} - Validates the form.
 * @property {@link LoginFormHookReturn#loginMoodle} - Logs the user in to moodle.
 */
export type LoginFormHookReturn = {
  readonly username: string
  readonly password: string
  readonly setUsername: (username: string) => void
  readonly setPassword: (password: string) => void
  readonly submit: () => void
  readonly validate: () => readonly [boolean, boolean]
  readonly loginMoodle: () => void
}

/**
 * Hook for the login form logic. Handles username and password state and
 * provides functions to validate and submit the form.
 * @param params - {@link useLoginFormHookParams}
 */
export const useLoginForm = (params?: useLoginFormHookParams): LoginFormHookReturn => {
  // Default values
  const { defaultUsername = '', defaultPassword = '' } = params ?? {}

  // State data
  const [username, setUsername] = useState(defaultUsername)
  const [password, setPassword] = useState(defaultPassword)

  // Logic
  const submit = () => {
    return
  }

  const validate = () => [username.length !== 0, password.length !== 0] as const

  const loginMoodle = () => {
    return
  }

  return {
    username,
    password,
    setUsername,
    setPassword,
    submit,
    validate,
    loginMoodle
  } as const
}
