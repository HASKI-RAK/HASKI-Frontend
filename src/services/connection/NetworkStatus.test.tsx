import '@testing-library/jest-dom'
import { act, fireEvent, renderHook } from '@testing-library/react'
import { useNetworkStatus } from './NetworkStatus.hooks'

describe('Test useNetworkStatus', () => {
  test('loss and retrieval of network status', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { result } = renderHook(() => useNetworkStatus())

    expect(result.current.isOnline).toEqual(true)

    act(() => {
      fireEvent(window, new Event('offline'))
    })

    expect(result.current.isOnline).toEqual(false)

    act(() => {
      fireEvent(window, new Event('online'))
    })

    expect(result.current.isOnline).toEqual(true)
    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function))
  })
})
