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
      if (response.ok) {
        log.debug('logout successful')
        setExpire(0)
        // Snackbar will be handled by the component which calls logout
      }
    }).catch((error: string) => {
      log.warn('logout failed: ', error)
      throw new Error(error)
    })
  }, [])

  return {
    isAuth,
    setExpire,
    logout
  }
}

export { useAuthProvider }
