import { useMemo, useCallback } from 'react'
import { AuthContextType, getLogout } from '@services'
import { usePersistedStore } from '@store'
import log from 'loglevel'

const useAuthProvider = (): AuthContextType => {
  // State data
  const expiration = usePersistedStore((state) => state.expire)
  const setStoreExpire = usePersistedStore((state) => state.setExpire)

  // Called by components which are part of login. Sets the auth state to true.
  const setExpire = useCallback(
    (expire: number) => {
      setStoreExpire(expire)
    },
    [setStoreExpire]
  )

  // check UNIX timestamp against current time in seconds and return true if the token is still valid
  const isAuth = useMemo(() => {
    const now = Math.floor(Date.now() / 1000)
    if (expiration < now) {
      log.warn('isAuth. Expired: ', expiration, now)
      return false
    }
    log.debug('isAuth. Not expired: ', expiration, now)
    return true
  }, [expiration])

  const logout = useCallback(() => {
    getLogout().then((response) => {
      if (response.status === 200) {
        log.debug('logout successful')
        setExpire(0)
        //addSnackbar({ message: t('services.AuthProvider.logout'), severity: 'success', autoHideDuration: 5000 })
      }
    })
  }, [setExpire])

  return {
    isAuth,
    setExpire,
    logout
  }
}

export { useAuthProvider }
