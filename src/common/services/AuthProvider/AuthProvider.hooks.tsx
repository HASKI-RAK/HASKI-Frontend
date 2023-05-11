import { useState, useEffect, useMemo, useCallback } from 'react'
import { getLoginStatus, getLogout } from '@services'
import useBoundStore from '@store'
import { User } from '@core'

const isUser = (user: unknown): user is User => (user as User).userId !== undefined

const useAuthProvider = () => {
  // State data
  const [isAuth, setIsAuth] = useState(false)
  const setUser = useBoundStore((state) => state.setUser)

  // Logic
  const clearCookie = () => {
    document.cookie = 'haski_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  const logout = useCallback(() => {
    getLogout().then((response) => {
      if (response.status === 200) {
        setIsAuth(false)
        clearCookie()
      }
    })
  }, [])

  // Side effects
  useEffect(() => {
    getLoginStatus().then((response) => {
      // When the user is logged in, the backend will return 200, otherwise 401 and clear the cookie
      if (response.status === 200) {
        setIsAuth(true)
        if (isUser(response.json)) {
          setUser(response.json)
        }
      } else {
        setIsAuth(false)
        clearCookie()
      }
    }).catch((error) => {
      // TODO: snackbar
      alert(error)
    })
  }, [setUser])

  return useMemo(() => ({ isAuth, setIsAuth, logout }), [isAuth, logout])
}

export { useAuthProvider }
