import '@testing-library/jest-dom'
import { render, renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import CourseMenu from './CourseMenu'
import { useCourseMenu } from './CourseMenu.hooks'

describe('CourseMenu tests', () => {
  it('renders correctly with isAuth false', () => {
    const courseMenu = render(
      <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <CourseMenu />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(courseMenu).toBeTruthy()
  })

  it('renders correctly with isAuth true', () => {
    const courseMenu = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <CourseMenu />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(courseMenu).toBeTruthy()
  })

  test('functionality of hook with isAuth false', async () => {
    const context = {
      isAuth: false,
      setExpire: jest.fn(),
      logout: jest.fn()
    }

    const { result } = renderHook(() => useCourseMenu(), {
      wrapper: ({ children }) => <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    })

    await waitFor(() => {
      expect(result.current.content).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
    })
  })

  test('functionality of hook with isAuth true', async () => {
    const context = {
      isAuth: true,
      setExpire: jest.fn(),
      logout: jest.fn()
    }

    const { result } = renderHook(() => useCourseMenu(), {
      wrapper: ({ children }) => <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    })

    await waitFor(() => {
      expect(result.current.content).toStrictEqual([
        {
          name: 'test',
          url: '/course/1',
          isDisabled: false,
          availableAt: new Date('2025-05-16T08:00:00.000Z')
        },
        {
          name: 'test',
          url: '/course/2',
          isDisabled: true,
          availableAt: new Date('2025-05-16T08:00:00.000Z')
        }
      ])
      expect(result.current.isLoading).toBeFalsy()
    })
  })

  test('functionality of hook with fetchCourses failed', async () => {
    const context = {
      isAuth: true,
      setExpire: jest.fn(),
      logout: jest.fn()
    }

    mockServices.fetchCourses.mockImplementationOnce(() => Promise.reject(new Error('getCourses failed')))

    const { result } = renderHook(() => useCourseMenu(), {
      wrapper: ({ children }) => <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    })

    await waitFor(() => {
      expect(result.current.content).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
    })
  })

  test('functionality of hook with fetchUser failed', async () => {
    const context = {
      isAuth: true,
      setExpire: jest.fn(),
      logout: jest.fn()
    }

    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('getUser failed')))

    const { result } = renderHook(() => useCourseMenu(), {
      wrapper: ({ children }) => <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    })

    await waitFor(() => {
      expect(result.current.content).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
    })
  })
})
