import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { useUniversity } from '@common/hooks'

describe('[HASKI-REQ-0034] useUniversity hook', () => {
  test('useUniversity returns valid value', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
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

    const { result } = renderHook(() => useUniversity(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })
    await waitFor(() => {
      expect(result.current.university).toStrictEqual('TH-AB')
    })
  })

  test('useUniversity returns empty string when fetch fails', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('error')))
    const { result } = renderHook(() => useUniversity(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })
    expect(await result.current.university).toBe('')
  })
})
