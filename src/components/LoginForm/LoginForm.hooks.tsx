/**
 * @property {@link useLoginFormHookParams#defaultUsername} - The default value for the username field.
 * @property {@link useLoginFormHookParams#defaultPassword} - The default value for the password field.
 */

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
  readonly loginMoodle: () => void
}

/**
 * Hook for the login form logic. Handles username and password state and
 * provides functions to validate and submit the form.
 * @param params - {@link useLoginFormHookParams}
 */
export const useLoginForm = (): LoginFormHookReturn => {
  // Logic
  const loginMoodle = () => {
    return
  }

  return {
    loginMoodle
  } as const
}
