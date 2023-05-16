import { useState, useEffect, useMemo, useCallback } from 'react'
import { getLoginStatus, getLogout } from '@services'

const useAuthProvider = () => {
  // State data
  const [isAuth, setIsAuth] = useState(false)

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
        // if (isUser(response.json)) {
        //   setUser(response.json)
        // }
      } else {
        setIsAuth(false)
        clearCookie()
      }
    }).catch((error) => {
      // TODO: snackbar error
    })
  }, [])

  return useMemo(() => ({ isAuth, setIsAuth, logout }), [isAuth, logout])
}

export { useAuthProvider }
