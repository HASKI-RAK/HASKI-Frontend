import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import fs from 'fs'
import { mockServices } from 'jest.setup'
import 'react-rating-charts'
import { MemoryRouter } from 'react-router-dom'
import StudentRatingDashboard from './StudentRatingDashboard'
import { useStudentRatingDashboard } from './StudentRatingDashboard.hooks'

declare global {
  interface SVGElement {
    getComputedTextLength?: () => number
  }
}

beforeAll(() => {
  SVGElement.prototype.getComputedTextLength = () => 100
})

jest.mock('react-rating-charts', () => ({
  __esModule: true,
  Rating: () => <div data-testid="mock-rating" />,
  SpiderGraph: () => <div data-testid="mock-spidergraph" />,
  LineGraph: () => <div data-testid="mock-linegraph" />,
  Table: () => <div data-testid="mock-table" />
}))

describe('StudentRatingDashboard', () => {
  it('should render correctly', async () => {
    const { getByText, container, getAllByRole } = render(
      <MemoryRouter>
        <StudentRatingDashboard />
      </MemoryRouter>
    )

    await waitFor(() => {
      const value = getByText('900.0')
      fireEvent.mouseOver(value)

      const valueTrend = container.querySelectorAll('image.value-trend')
      fireEvent.mouseOver(valueTrend[0])

      const deviation = screen.getByText('176')
      fireEvent.mouseOver(deviation)

      const deviationTrend = container.querySelectorAll('image.deviation-trend')
      fireEvent.mouseOver(deviationTrend[0])

      const dataPoint = container.querySelectorAll('circle.data-point')
      fireEvent.mouseOver(dataPoint[0])

      const upperDeviation = container.querySelectorAll('circle.upper-deviation')
      fireEvent.mouseOver(upperDeviation[0])

      const lowerDeviation = container.querySelectorAll('circle.lower-deviation')
      fireEvent.mouseOver(lowerDeviation[0])

      const xAxis = container.querySelectorAll('g.x-axis')
      fireEvent.mouseOver(xAxis[0])
      fireEvent.mouseOver(xAxis[1])

      const yAxis = container.querySelectorAll('g.y-axis')
      fireEvent.mouseOver(yAxis[0])
      fireEvent.mouseOver(yAxis[1])

      const radioButton = getAllByRole('radio')
      fireEvent.click(radioButton[1])

      const header = container.querySelectorAll('th')
      fireEvent.mouseOver(header[0])

      const userInfo = container.querySelectorAll('text.user-info')
      fireEvent.mouseOver(userInfo[0])
    })
  })

  it('rerenders the chart and checks the tooltip of the spider graph', async () => {
    const { getAllByRole, container } = render(
      <MemoryRouter>
        <StudentRatingDashboard />
      </MemoryRouter>
    )

    await waitFor(() => {
      // Re-renders the whole component.
      const radioButton = getAllByRole('radio')
      fireEvent.click(radioButton[1])
      const dataPoints = container.querySelectorAll('circle.data-point')
      fireEvent.mouseOver(dataPoints[0])
    })
  })

  test('Functionality of the hook', async () => {
    const { result } = renderHook(() => useStudentRatingDashboard())

    expect(result.current.ratingValue).toEqual(0)
    expect(result.current.ratingDeviation).toEqual(0)
    expect(result.current.maxRatingDeviation).toEqual(0)
    expect(result.current.ratingDeviationTrend).toEqual(0)
    expect(result.current.ratingValueTrend).toEqual(0)
    expect(result.current.spiderGraphData).toEqual({})
    expect(result.current.lineGraphData).toEqual([])
    expect(result.current.topics).toEqual([])
    expect(result.current.histogramData).toEqual([])

    await waitFor(async () => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.ratingValue).toEqual(900)
    expect(result.current.ratingDeviation).toEqual(90)
    expect(result.current.maxRatingDeviation).toEqual(120)
    expect(result.current.ratingDeviationTrend).toEqual(30)
    expect(result.current.ratingValueTrend).toEqual(300)
    expect(result.current.spiderGraphData).toEqual({ '1': 1000, '99': 800 })
    expect(result.current.lineGraphData).toEqual([
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
    expect(result.current.histogramData).toEqual([900, 1000, 800])
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

  test('Functionality of the hook with getUser failing', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('fetchUser error')))
    const { result } = renderHook(() => useStudentRatingDashboard())

    await waitFor(async () => {
      expect(result.current.isLoading).toBe(true)
    })
  })

  test('Functionality of the hook with getCourses failing', async () => {
    mockServices.fetchCourses.mockImplementationOnce(() => Promise.reject(new Error('fetchCourses error')))
    const { result } = renderHook(() => useStudentRatingDashboard())

    await waitFor(async () => {
      expect(result.current.isLoading).toBe(true)
    })
  })

  test('Functionality of the hook with getLearningPathTopic failing', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchLearningPathTopic error'))
    )
    const { result } = renderHook(() => useStudentRatingDashboard())

    await waitFor(async () => {
      expect(result.current.isLoading).toBe(true)
    })
  })

  test('Functionality of the hook with fetchStudentRatings failing', async () => {
    mockServices.fetchStudentRatings.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchStudentRatings error'))
    )
    const { result } = renderHook(() => useStudentRatingDashboard())

    await waitFor(async () => {
      expect(result.current.isLoading).toBe(true)
    })
  })
})
