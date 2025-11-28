import { render } from '@testing-library/react'
import RatingDashboardDrawer from './RatingDashboardDrawer'

describe('RatingDashboardDrawer', () => {
  it('renders when isOpen is true and StudentRating dashboard is selected', () => {
    const ratingDashboardDrawer = render(<RatingDashboardDrawer isOpen={true} selectedDashboard="StudentRating" />)
    expect(ratingDashboardDrawer).toBeTruthy()
  })

  it('renders when isOpen is true and LearningElementRating dashboard is selected', () => {
    const ratingDashboardDrawer = render(
      <RatingDashboardDrawer isOpen={true} selectedDashboard="LearningElementRating" />
    )
    expect(ratingDashboardDrawer).toBeTruthy()
  })

  it('renders when isOpen is false and StudentRating dashboard is selected', () => {
    const ratingDashboardDrawer = render(<RatingDashboardDrawer isOpen={false} selectedDashboard="StudentRating" />)
    expect(ratingDashboardDrawer).toBeTruthy()
  })
})
