/*import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import LearningElementRatingDashboard from '../delete/LearningElementRatingDashboard'
import { useLearningElementRatingDashboard } from './LearningElementRatingDashboard.hooks'

describe('LearningElementRatingDashboard hook', () => {
  test('Functionality of the hook', () => {
    const { result } = renderHook(() => useLearningElementRatingDashboard())

    expect(result.current.ratingValue).toEqual(0)
    expect(result.current.ratingDeviation).toEqual(0)
    expect(result.current.maxRatingDeviation).toEqual(0)
    expect(result.current.ratingDeviationTrend).toEqual(0)
    expect(result.current.ratingValueTrend).toEqual(0)
    expect(result.current.spiderGraphData).toEqual({})
    expect(result.current.lineGraphData).toEqual([])
    expect(result.current.topics).toEqual([])

    waitFor(() => {
      expect(result.current.isLoading).toBe(false)

      expect(result.current.ratingValue).toEqual(0.8055555555555555)
      expect(result.current.ratingDeviation).toEqual(0.8055555555555556)
      expect(result.current.maxRatingDeviation).toEqual(1)
      expect(result.current.ratingDeviationTrend).toEqual(0.5277777777777778)
      expect(result.current.ratingValueTrend).toEqual(0.5277777777777777)
      expect(result.current.spiderGraphData).toEqual({ '1': 1200, '2': 900, '99': 800 })
      expect(result.current.lineGraphData).toEqual([
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
      expect(result.current.topics).toEqual([
        {
          contains_le: true,
          created_at: 'string',
          created_by: 'string',
          id: 1,
          is_topic: true,
          last_updated: 'string',
          lms_id: 1,
          name: 'Wirtschaftsinformatik',
          parent_id: 1,
          student_topic: {
            done: true,
            done_at: 'string',
            id: 1,
            student_id: 1,
            topic_id: 1,
            visits: ['string']
          },
          university: 'HS-Kempten'
        },
        {
          contains_le: true,
          created_at: 'string',
          created_by: 'string',
          id: 2,
          is_topic: true,
          last_updated: 'string',
          lms_id: 1,
          name: 'Informatik',
          parent_id: 1,
          student_topic: {
            done: true,
            done_at: 'string',
            id: 2,
            student_id: 1,
            topic_id: 2,
            visits: ['string']
          },
          university: 'HS-Kempten'
        },
        {
          contains_le: true,
          created_at: 'string',
          created_by: 'string',
          id: 1,
          is_topic: true,
          last_updated: 'string',
          lms_id: 1,
          name: 'Wirtschaftsinformatik',
          parent_id: 1,
          student_topic: {
            done: true,
            done_at: 'string',
            id: 1,
            student_id: 1,
            topic_id: 1,
            visits: ['string']
          },
          university: 'HS-Kempten'
        },
        {
          contains_le: true,
          created_at: 'string',
          created_by: 'string',
          id: 2,
          is_topic: true,
          last_updated: 'string',
          lms_id: 1,
          name: 'Informatik',
          parent_id: 1,
          student_topic: {
            done: true,
            done_at: 'string',
            id: 2,
            student_id: 1,
            topic_id: 2,
            visits: ['string']
          },
          university: 'HS-Kempten'
        }
      ])
    })
  })

  test('Functionality of the hook with getUser failing', () => {
    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('fetchUser error')))

    const { result } = renderHook(() => useLearningElementRatingDashboard())

    waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    })
  })

  test('Functionality of the hook with getCourses failing', () => {
    mockServices.fetchCourses.mockImplementationOnce(() => Promise.reject(new Error('fetchCourses error')))
    const { result } = renderHook(() => useLearningElementRatingDashboard())

    waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    })
  })

  test('Functionality of the hook with getLearningPathTopic failing', () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchLearningPathTopic error'))
    )
    const { result } = renderHook(() => useLearningElementRatingDashboard())

    waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    })
  })

  test('Functionality of the hook with fetchLearningElementRatings failing', () => {
    mockServices.fetchLearningElementRatings.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchLearningElementRatings error'))
    )
    const { result } = renderHook(() => useLearningElementRatingDashboard())
    waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    })
  })
})
*/


describe('', () => {
  it('should be true', () => {
    expect(true).toBe(true)
  })
})