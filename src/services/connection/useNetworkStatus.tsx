import { useState, useEffect } from 'react'

/**
 * Service hook for the network status. Returns true if the user is online
 * and false otherwise.
 * @returns {boolean} - The network status.
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleStatusChange = (isOnline: boolean) => {
      setIsOnline(isOnline)
    }

    window.addEventListener('online', () => handleStatusChange(true))
    window.addEventListener('offline', () => handleStatusChange(false))

    return () => {
      window.removeEventListener('online', () => handleStatusChange(true))
      window.removeEventListener('offline', () => handleStatusChange(false))
    }
  }, [isOnline])

  return isOnline
}
