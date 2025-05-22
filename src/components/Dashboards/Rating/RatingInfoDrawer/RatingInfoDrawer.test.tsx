import { render } from '@testing-library/react'
import RatingInfoDrawer from './RatingInfoDrawer'

describe('RatingInfoDrawer tests', () => {
  test('RatingInfoDrawer open when student selected', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={true} selectedDashboard="StudentRatingDashboard" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })

  test('RatingInfoDrawer open when student no selected', () => {
    const ratingInfoDrawer = render(
      <RatingInfoDrawer isOpen={true} selectedDashboard="LearningElementRatingDashboard" />
    )
    expect(ratingInfoDrawer).toBeTruthy()
  })

  test('RatingInfoDrawer not open', () => {
    const ratingInfoDrawer = render(<RatingInfoDrawer isOpen={false} selectedDashboard="StudentRatingDashboard" />)
    expect(ratingInfoDrawer).toBeTruthy()
  })
})
