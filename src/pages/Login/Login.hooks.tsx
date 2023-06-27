import { AuthContext, SnackbarContext, postLogin, postLoginCredentials, redirectMoodleLogin } from '@services'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()
  const { addSnackbar } = useContext(SnackbarContext)

  // Login with username and password
  const onSubmitHandler = () => {
    params.setIsLoading(false)
    addSnackbar({ message: t('components.Login.passwordError'), severity: 'success', autoHideDuration: 5000 })
  }

  const onMoodleLogin = () => {
    params.setIsLoading(true)
    redirectMoodleLogin()
      .then((response) => {
        if (response.status === 200) {
          // 👇️ redirects to Moodle LTI launch acticity
          window.location.replace(response.message)
        } else {
          //TODO 🍿 snackbar
          addSnackbar({ message: response.message, severity: 'error', autoHideDuration: 5000 })
        }
      })
      .catch((error: string) => {
        //TODO 🍿 snackbar
        addSnackbar({ message: error, severity: 'error', autoHideDuration: 5000 })
      })
      .finally(() => {
        params.setIsLoading(false)
      })
  }

  // on mount, read search param 'nounce' and set it to state
  useEffect(() => {
    postLogin({ nonce: params.nonce })
      .then((response) => {
        // supply auth context
        authcontext.setExpire(response.expiration)
        // then redirect to home page
        navigate('/', { replace: true })
      })
      .catch((error: string) => {
        //TODO 🍿 snackbar
        addSnackbar({ message: error, severity: 'error', autoHideDuration: 5000 })
        navigate('/login', { replace: true })
      })
  }, [])

  return {
    onSubmit: onSubmitHandler,
    onMoodleLogin
  } as const
}
