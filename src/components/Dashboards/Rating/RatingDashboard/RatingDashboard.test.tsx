import { fireEvent, render, waitFor } from '@testing-library/react'
import { RatingDashboard, useStudentRatingDashboard } from '@components'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'
import '@testing-library/jest-dom'

declare global {
  interface SVGElement {
    getComputedTextLength?: () => number
  }
}

beforeAll(() => {
  SVGElement.prototype.getComputedTextLength = () => 100
})

describe('RatingDashboard', () => {
  it('renders StudentRatingDashboard with default hook', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <RatingDashboard selectedDashboard="StudentRating" />
      </MemoryRouter>
    )

    const heading = getByRole('heading', { level: 5 })
    expect(heading).toBeInTheDocument()
  })

  it('renders LearningElementRatingDashboard with default hook', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <RatingDashboard selectedDashboard="LearningElementRating" />
      </MemoryRouter>
    )

    const heading = getByRole('heading', { level: 5 })
    expect(heading).toBeInTheDocument()
  })

  it('shows tooltips and handles radio button change', async () => {
    mockServices.fetchCourses.mockImplementationOnce(() => {
      Promise.resolve({
        courses: [
          {
            id: 1,
            lms_id: 1,
            name: 'test',
            university: 'test',
            created_at: 'test',
            created_by: 'test',
            last_updated: 'test',
            start_date: 'Thu, 31 Oct 2024 15:05:57 GMT'
          },
          {
            id: 2,
            lms_id: 2,
            name: 'test',
            university: 'test',
            created_at: 'test',
            created_by: 'test',
            last_updated: 'test',
            start_date: 'Thu, 31 Oct 3024 15:05:57 GMT'
          }
        ]
      })
    })

    const { getByText, container, getAllByRole } = render(
      <MemoryRouter>
        <RatingDashboard selectedDashboard="StudentRating" useRatingDashboard={useStudentRatingDashboard} />
      </MemoryRouter>
    )

    await waitFor(() => {
      const value = getByText('0.750')
      fireEvent.mouseOver(value)

      const valueTrend = container.querySelectorAll('image.value-trend')
      fireEvent.mouseOver(valueTrend[0])

      const deviation = getByText('0.75')
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

    expect(getByText('components.StudentRatingDashboard.ratingTitle')).toBeInTheDocument()
    expect(getByText('components.StudentRatingDashboard.spiderGraphTitle')).toBeInTheDocument()
    expect(getByText('components.StudentRatingDashboard.histogramTitle')).toBeInTheDocument()
    expect(getByText('components.StudentRatingDashboard.lineGraphTitle')).toBeInTheDocument()
  })

  it('rerenders StudentRatingDashboard and displays spider graph tooltip on hover', async () => {
    const { getAllByRole, container, getByText } = render(
      <MemoryRouter>
        <RatingDashboard selectedDashboard="StudentRating" useRatingDashboard={useStudentRatingDashboard} />
      </MemoryRouter>
    )

    await waitFor(() => {
      // Re-renders the whole component.
      const radioButton = getAllByRole('radio')
      fireEvent.click(radioButton[1])
      const dataPoints = container.querySelectorAll('circle.data-point')
      fireEvent.mouseOver(dataPoints[0])
    })

    expect(getByText('components.StudentRatingDashboard.ratingTitle')).toBeInTheDocument()
    expect(getByText('components.StudentRatingDashboard.spiderGraphTitle')).toBeInTheDocument()
    expect(getByText('components.StudentRatingDashboard.histogramTitle')).toBeInTheDocument()
    expect(getByText('components.StudentRatingDashboard.lineGraphTitle')).toBeInTheDocument()
  })
})
