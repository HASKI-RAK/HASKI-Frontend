import { Skeleton } from '@common/components'
import { LoginForm } from '@components'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { LoginHookParams, LoginHookReturn, useLogin as _useLogin } from './Login.hooks'

type LoginProps = {
  /**
   * {@link useLogin | Login hook} to control the moodle login.
   * @defaultValue {@link _useLogin}
   */
  useLogin?: (params: LoginHookParams) => LoginHookReturn
}

/**
 * # Login Page
 * Uses the LoginForm component to present the form.
 * @remarks
 * The nonce is passed by the LTI provider and is used to authenticate the user.
 * If the user is already authenticated, the page redirects to the home page.
 * This is done in the {@link useLogin | useLogin hook}.
 * @param props - Dependency injects {@link useLogin} to control the sumbit on the page. Also displays a loading indicator when submitting.
 * @category Pages
 */
export const Login = ({ useLogin = _useLogin }: LoginProps) => {
  // UX state
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()

  const nonce = searchParams.get('nonce') || undefined

  // Application logic hooks
  const { onMoodleLogin } = useLogin({ setIsLoading, nonce })

  if (nonce) return <Skeleton />
  else return <LoginForm isLoading={isLoading} onMoodleLogin={onMoodleLogin} />
}

export default Login
