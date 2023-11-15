import { AuthContext, SnackbarContext, postLogin, postLoginCredentials, redirectMoodleLogin } from '@services'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { usePersistedStore } from '@store'

export type LoginHookParams = {
  setIsLoading: (isLoading: boolean) => void
  /** The nonce is a string that is passed to the login page back from the backend as part of the LTI flow.
   * It is used to accociate the session in a short living authorization flow. */
  nonce?: string
}

export type LoginHookReturn = {
  readonly onSubmit: (username: string, password: string) => void
  /** Redirects the user to moddle for authorization */
  readonly onMoodleLogin: () => void
}

/**
 * Hook for the login logic. Handles the login request and redirects to the home page.
 * @param props - Contain nonce and {@link LoginHookParams.setIsLoading | setIsLoading} function.
 * @remarks
 * If a nonce is passed, the user can be authenticated with the nonce.
 * If no nonce is passed the user is redirected to the login page without a nonce.
 *
 */
export const useLogin = (props: LoginHookParams): LoginHookReturn => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const getUser = usePersistedStore((state) => state.getUser)
  const { addSnackbar } = useContext(SnackbarContext)

  // Login with username and password
  const onSubmitHandler = (username: string, password: string) => {
    postLoginCredentials(Number(username), password).then((user) => {
      // supply auth context
      authContext.setExpire(9999999999)
      getUser(user)

      // then redirect to home page
      navigate('/', { replace: true })
    })
  }

  const onMoodleLogin = () => {
    props.setIsLoading(true)
    redirectMoodleLogin()
      .then((response) =>
        // 👇️ redirects to Moodle LTI launch acticity
        window.location.replace(response.lti_launch_view)
      )
      .catch((error) => {
        addSnackbar({ message: error, severity: 'error', autoHideDuration: 5000 })
      })
      .finally(() => {
        props.setIsLoading(false)
      })
  }

  // on mount, read search param 'nounce' and set it to state
  useEffect(() => {
    if (!props.nonce) return

    postLogin({ nonce: props.nonce })
      .then((response) => {
        // supply auth context
        authContext.setExpire(response.expiration)
        // then redirect to home page
        navigate('/', { replace: true })
      })
      .catch((error: string) => {
        addSnackbar({ message: error, severity: 'error', autoHideDuration: 5000 })
        navigate('/login', { replace: true })
      })
  }, [])

  return {
    onSubmit: onSubmitHandler,
    onMoodleLogin
  } as const
}
