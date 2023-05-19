import { AuthContext, postLogin, postLoginCredentials, redirectMoodleLogin } from '@services'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext, useCallback } from 'react'

export type LoginHookParams = {
  setIsLoading: (isLoading: boolean) => void
  nonce?: string
}

export type LoginHookReturn = {
  readonly onSubmit: () => void
  readonly onMoodleLogin: () => void
}

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
  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()

  const login = useCallback(() => {
    // supply auth context
    authcontext.setIsAuth(true)
    // then redirect to home page
    navigate('', { replace: true })
  }, [authcontext, navigate])

  // Login with username and password
  const onSubmitHandler = () => {
    params.setIsLoading(true)
    postLoginCredentials()
      .then((response) => {
        if (response.status === 200) {
          login()
        }

        //TODO catch and🍿 snackbar
      })
      .finally(() => {
        params.setIsLoading(false)
      })
  }

  const onMoodleLogin = () => {
    params.setIsLoading(true)
    redirectMoodleLogin()
      .then((response) => {
        if (response.status === 200) {
          // 👇️ redirects to Moodle LTI launch acticity
          window.location.replace(response.message)
        }

        //TODO catch and🍿 snackbar
      })
      .finally(() => {
        params.setIsLoading(false)
      })
  }

  // on mount, read search param 'nounce' and set it to state
  useEffect(() => {
    postLogin({ nonce: params.nonce }).then((response) => {
      if (response.status === 200) login()
      else navigate('/login', { replace: true })

      //TODO 🍿 snackbar
    })
  }, [login, navigate, params.nonce])

  return {
    onSubmit: onSubmitHandler,
    onMoodleLogin
  } as const
}
