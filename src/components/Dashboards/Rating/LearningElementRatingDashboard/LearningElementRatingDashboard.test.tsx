/*import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LearningElementRatingDashboard from '../delete/LearningElementRatingDashboard'

declare global {
  interface SVGElement {
    getComputedTextLength?: () => number
  }
}

beforeAll(() => {
  SVGElement.prototype.getComputedTextLength = () => 100
})

describe('LearningElementRatingDashboard', () => {
  it('should render correctly', async () => {
    const { getByText, container, getAllByRole, rerender } = render(
      <MemoryRouter>
        <LearningElementRatingDashboard />
      </MemoryRouter>
    )

    await new Promise(process.nextTick)

    rerender(
      <MemoryRouter>
        <LearningElementRatingDashboard />
      </MemoryRouter>
    )

    await waitFor(() => {
      const value = getByText('0.805')
      act(() => {
        fireEvent.mouseOver(value)
      })

      const valueTrend = container.querySelectorAll('image.value-trend')
      act(() => {
        fireEvent.mouseOver(valueTrend[0])
      })

      const deviation = getByText('0.80')
      act(() => {
        fireEvent.mouseOver(deviation)
      })

      const deviationTrend = container.querySelectorAll('image.deviation-trend')
      act(() => {
        fireEvent.mouseOver(deviationTrend[0])
      })

      const dataPoints = container.querySelectorAll('circle.data-point')
      act(() => {
        fireEvent.mouseOver(dataPoints[0])
        fireEvent.mouseOver(dataPoints[4])
      })

      const upperDeviation = container.querySelectorAll('circle.upper-deviation')
      act(() => {
        fireEvent.mouseOver(upperDeviation[0])
      })

      const lowerDeviation = container.querySelectorAll('circle.lower-deviation')
      act(() => {
        fireEvent.mouseOver(lowerDeviation[0])
      })

      const xAxis = container.querySelectorAll('g.x-axis')
      act(() => {
        fireEvent.mouseOver(xAxis[0])
      })

      const yAxis = container.querySelectorAll('g.y-axis')
      act(() => {
        fireEvent.mouseOver(yAxis[0])
      })

      const radioButton = getAllByRole('radio')
      act(() => {
        fireEvent.click(radioButton[1])
      })

      const header = container.querySelectorAll('th')
      act(() => {
        fireEvent.mouseOver(header[0])
      })
    })
  })
})
*/

describe('', () => {
  it('should be true', () => {
    expect(true).toBe(true)
  })
})
