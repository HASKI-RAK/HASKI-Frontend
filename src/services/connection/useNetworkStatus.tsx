import { useState, useEffect, useMemo } from 'react'

/**
 * @prop online - The default value for the network status.
 * @category Services
 * @category Hooks
 * @interface
 */
export type useNetworkStatusHookParams = {
  online?: boolean
}

/**
 * @prop isOnline - The current network status.
 * @category Services
 * @category Hooks
 * @interface
 */
export type NetworkStatusHookReturn = {
  readonly isOnline: boolean
}

/**
 * useNetworkStatus hook.
 *
 * @param params - The default values for the network status.
 *
 * @remarks
 * Service hook for the network status. Returns true if the user is online and false otherwise.
 *
 * @returns
 * The current network status.
 *
 * @category Services
 * @category Hooks
 */
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
