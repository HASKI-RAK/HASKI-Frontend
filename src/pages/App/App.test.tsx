import '@testing-library/jest-dom'
import { render, renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import log from 'loglevel'
import { App } from './App'
import { useApp } from './App.hooks'

describe('[HASKI-REQ-0099] App tests', () => {
  test('renders correctly', () => {
    const app = render(<App />)
    expect(app).toBeTruthy()
  })

  test('useApp hook', async () => {
    jest.spyOn(log, 'error').mockImplementationOnce((error: string) => error)
    mockServices.fetchUser.mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    const { result } = renderHook(() => useApp())
    await waitFor(() => {
      expect(result.current.xAPI).toStrictEqual({
        currentLanguage: '',
        onError: expect.any(Function),
        projectURL: '',
        projectVersion: '',
        repositories: {
          component: '/functions/common.',
          page: '/functions/pages.',
          verb: '/variables/services.'
        },
        userID: '1',
        xAPI: expect.any(Object)
      })

      expect(result.current.xAPI?.onError?.('test')).toBe('error.sendStatement test')
    })
  })

  test('useApp hook with getUser failed', async () => {
    const mockfetchUser = (mockServices.fetchUser = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error('error'))))

    const { result } = renderHook(() => useApp())

    await waitFor(() => {
      expect(result.current.xAPI).toStrictEqual({
        currentLanguage: '',
        onError: expect.any(Function),
        projectURL: '',
        projectVersion: '',
        repositories: {
          component: '/functions/common.',
          page: '/functions/pages.',
          verb: '/variables/services.'
        },
        userID: undefined,
        xAPI: expect.any(Object)
      })

      expect(mockfetchUser).toHaveBeenCalled()
    })
  })
})
