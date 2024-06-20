import log from 'loglevel'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContextType, fetchLogout } from '@services'
import { usePersistedStore } from '@store'
import { useNavigate } from 'react-router-dom'

const useAuthProvider = (): AuthContextType => {
  const navigate = useNavigate()

  // State data
  const expiration = usePersistedStore((state) => state.expire)
  const setStoreExpire = usePersistedStore((state) => state.setExpire)
  const [isAuthState, setIsAuthState] = useState(false)

  // Check UNIX timestamp against current time in seconds and return true if the token is still valid
  const isAuth = useMemo(() => {
    const now = Math.floor(Date.now() / 1000)
    if (expiration < now) {
      log.warn('isAuth. Expired: ', expiration, now)
      return false
    }
    log.debug('isAuth. Not expired: ', expiration, now)
    return true
  }, [expiration])

  useEffect(() => {
    setIsAuthState(isAuth)
  }, [isAuth])

  useEffect(() => {
    log.debug('AuthProvider mounted')
    return () => {
      log.debug('AuthProvider unmounted')
    }
  }, [])

  useEffect(() => {
    if (!isAuthState) {
      navigate('/login')
    }
  }, [isAuthState, navigate])

  // Called by components which are part of login. Sets the auth state to true.
  const setExpire = useCallback(
    (expire: number) => {
      setStoreExpire(expire)
    },
    [setStoreExpire]
  )

  const logout = useCallback(async () => {
    return fetchLogout()
      .then(() => {
        setExpire(0)
        log.debug('logout successful')
        // TODO 📑 clear state in zustand
        // Snackbar will be handled by the component which calls logout
      })
      .catch((error) => {
        log.error('logout failed: ', error)
        throw new Error(error)
      })
  }, [setExpire])

  return {
    isAuth: isAuthState,
    setExpire,
    logout
  } as const
}

export { useAuthProvider }
