import { renderHook, act, fireEvent } from '@testing-library/react'
import { useNetworkStatus } from './useNetworkStatus'
import '@testing-library/jest-dom'

describe('Test useNetworkStatus', () => {
  test('loss and retrieval of network status', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { result } = renderHook(() => useNetworkStatus())

    expect(result.current).toEqual(true)

    act(() => {
      fireEvent(window, new Event('offline'))
    })

    expect(result.current).toEqual(false)

    act(() => {
      fireEvent(window, new Event('online'))
    })

    expect(result.current).toEqual(true)
    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function))
  })
})
