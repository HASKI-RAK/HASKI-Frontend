import '@testing-library/jest-dom'
import { fireEvent, render, act, renderHook } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { useUniversity } from '@common/hooks'


test("UniversityCheck returns university", ()=>{

    test('checkUniversity returns valid value', async () => {
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
        expect(await result.current.university).toBe('TH-AB')
      })

      test('checkUniversity returns empty string when fetch fails', async () => {
        mockServices.fetchUser = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('error')))
        const { result } = renderHook(() => useUniversity(), {
          wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
        })
        expect(await result.current.university).toBe('')
      })
})