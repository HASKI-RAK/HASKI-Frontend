import { useState, useEffect, useMemo } from 'react'

/**
 * Service hook for the network status. Returns true if the user is online
 * and false otherwise.
 * @returns {boolean} - The network status.
 */

export type useNetworkStatusHookParams = {
  online?: boolean
}

export type NetworkStatusHookReturn = {
  readonly isOnline: boolean
}

export const useNetworkStatus = (params?: useNetworkStatusHookParams): NetworkStatusHookReturn => {
  // Default values.
  const { online = navigator.onLine } = params ?? {}

  // Logic.
  const [isOnline, setIsOnline] = useState(online)

  useEffect(() => {
    const handleOnlineStatusChange = () => setIsOnline(true)
    const handleOfflineStatusChange = () => setIsOnline(false)

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOfflineStatusChange)

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOfflineStatusChange)
    }
  }, [isOnline])

  return useMemo(() => ({ isOnline }), [isOnline])
}
