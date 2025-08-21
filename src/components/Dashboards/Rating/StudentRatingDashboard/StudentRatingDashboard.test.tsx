import { renderHook, waitFor } from '@testing-library/react'
import { useStudentRatingDashboard } from './StudentRatingDashboard.hooks'
import { mockServices } from 'jest.setup'
import { AuthContext } from '@services'

describe('useStudentRatingDashboard', () => {
  it('correctly fetches and calculates student rating dashboard data', async () => {
    const { result } = renderHook(() => useStudentRatingDashboard(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.ratingValue).toBe(0.75)
      expect(result.current.ratingDeviation).toBe(0.75)
      expect(result.current.maxRatingDeviation).toBe(1)
      expect(result.current.ratingValueTrend).toBe(0.25)
      expect(result.current.ratingDeviationTrend).toBe(0.25)
      expect(result.current.userRatingValue).toBe(900)
      expect(result.current.spiderGraphData).toStrictEqual({
        '1': 1000,
        '99': 800
      })
      expect(result.current.lineGraphData).toStrictEqual([
        {
          deviation: 235.2,
          timestamp: new Date('2023-01-01T00:00:00.000Z'),
          value: 1200
        },
        {
          deviation: 215.6,
          timestamp: new Date('2023-01-02T00:00:00.000Z'),
          value: 1100
        },
        {
          deviation: 196,
          timestamp: new Date('2023-01-02T00:00:00.000Z'),
          value: 1000
        }
      ])
      expect(result.current.histogramData).toStrictEqual([900, 1000, 800])
      expect(result.current.isLoading).toBeFalsy()
    })
  })

  it('returns isLoading true when fetchUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('fetchUser error')))
    const { result } = renderHook(() => useStudentRatingDashboard(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy()
    })
  })

  it('returns isLoading true when fetchStudentRatings fails', async () => {
    mockServices.fetchStudentRatings.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchStudentRatings error'))
    )
    const { result } = renderHook(() => useStudentRatingDashboard(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy()
    })
  })

  it('returns isLoading true when isAuth is false', async () => {
    const { result } = renderHook(() => useStudentRatingDashboard(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy()
    })
  })
})
