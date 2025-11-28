/**
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
