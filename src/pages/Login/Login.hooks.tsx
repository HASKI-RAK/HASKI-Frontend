import { useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import log from 'loglevel'

import { AuthContext, fetchRedirectMoodleLogin, postLogin,SnackbarContext } from '@services'

export type LoginHookParams = {
  setIsLoading: (isLoading: boolean) => void
  /** The nonce is a string that is passed to the login page back from the backend as part of the LTI flow.
   * It is used to associate the session in a short living authorization flow. */
  nonce?: string
}

export type LoginHookReturn = {
  /** Redirects the user to moodle for authorization */
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
  const { addSnackbar } = useContext(SnackbarContext)
  const { t } = useTranslation()
  const popup = useRef<Window | null>(null)

  const onMoodleLogin = () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.source === popup.current && event.data === 'login_success') {
        navigate('/', { replace: true })
        window.location.reload()
      }
    }
    props.setIsLoading(true)
    fetchRedirectMoodleLogin()
      .then((response) => {
        // 👇️ if possible creates a popup linked to Moodle LTI launch activity, otherwise redirects to it
        const popupPositionLeft = window.screenLeft + window.outerWidth / 2 - 300
        const popupPositionTop = window.screenTop + window.outerHeight / 8
        popup.current = window.open(
          response.lti_launch_view,
          'login_window',
          `popup=true, width=600, height=600, left=${popupPositionLeft}, top=${popupPositionTop}`
        )
        if (popup.current) {
          popup.current.focus()
          window.addEventListener('message', messageHandler)
        } else {
          window.location.replace(response.lti_launch_view)
        }
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.fetchRedirectMoodleLogin'),
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(t('error.fetchRedirectMoodleLogin') + 'Error: ' + error)
      })
      .finally(() => {
        props.setIsLoading(false)
      })
  }

  // on mount, read search param 'nonce' and set it to state
  useEffect(() => {
    if (!props.nonce) return

    postLogin({ nonce: props.nonce })
      .then((response) => {
        // supply auth context
        authContext.setExpire(response.expiration)
        // then redirect to home page through message event
        if (window.opener !== null) {
          window.opener.postMessage('login_success', window.location.origin)
          window.close()
        }
      })
      .catch((error: string) => {
        addSnackbar({
          message: t('error.postLogin'),
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(t('error.postLogin') + ' ' + error)
        navigate('/login', { replace: true })
      })
  }, [])

  return {
    onMoodleLogin
  } as const
}
