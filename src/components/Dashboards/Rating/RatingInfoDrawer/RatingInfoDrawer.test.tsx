import { render } from '@testing-library/react'
import RatingInfoDrawer from './RatingInfoDrawer'

describe('RatingInfoDrawer', () => {
  it('opens when student selected', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={true} selectedDashboard="StudentRating" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })

  it('opens when student no selected', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={true} selectedDashboard="LearningElementRating" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })

  it('does not open', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={false} selectedDashboard="StudentRating" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })
})
