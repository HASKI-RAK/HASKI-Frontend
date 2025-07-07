import { render } from '@testing-library/react'
import RatingInfoDrawer from './RatingInfoDrawer'

describe('RatingInfoDrawer', () => {
  it('renders when isOpen is true and StudentRating dashboard is selected', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={true} selectedDashboard="StudentRating" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })

  it('renders when isOpen is true and LearningElementRating dashboard is selected', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={true} selectedDashboard="LearningElementRating" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })

  it('renders when isOpen is false and StudentRating dashboard is selected', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={false} selectedDashboard="StudentRating" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })
})
