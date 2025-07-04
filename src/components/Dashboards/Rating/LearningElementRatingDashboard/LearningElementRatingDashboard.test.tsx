import { renderHook, waitFor } from '@testing-library/react'
import { useLearningElementRatingDashboard } from './LearningElementRatingDashboard.hooks'
import { mockServices } from 'jest.setup'

describe('useLearningElementRatingDashboard', () => {
  it('correctly fetches and calculates learning element rating dashboard data', async () => {
    const { result } = renderHook(() => useLearningElementRatingDashboard())

    await waitFor(() => {
      expect(result.current.ratingValue).toBe(0.8055555555555555)
      expect(result.current.ratingDeviation).toBe(0.8055555555555556)
      expect(result.current.maxRatingDeviation).toBe(1)
      expect(result.current.ratingValueTrend).toBe(0.5277777777777777)
      expect(result.current.ratingDeviationTrend).toBe(0.5277777777777778)
      expect(result.current.userRatingValue).toBe(0)
      expect(result.current.spiderGraphData).toStrictEqual({
        '1': 1200,
        '2': 900,
        '99': 800
      })
      expect(result.current.lineGraphData).toStrictEqual([
        {
          deviation: 196,
          timestamp: new Date('2023-01-01T00:00:00.000Z'),
          value: 1000
        },
        {
          deviation: 182.9333333333333,
          timestamp: new Date('2023-01-02T00:00:00.000Z'),
          value: 933.3333333333334
        }
      ])
      expect(result.current.histogramData).toStrictEqual([])
      expect(result.current.isLoading).toBeFalsy()
    })
  })

  it('returns isLoading true when fetchLearningElementRatings fails', async () => {
    mockServices.fetchLearningElementRatings.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchLearningElementRatings error'))
    )
    const { result } = renderHook(() => useLearningElementRatingDashboard())

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy()
    })
  })
})