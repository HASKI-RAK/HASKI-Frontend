import { render } from '@testing-library/react'
import LearningElementRatingInfo from './LearningElementRatingInfo'

describe('LearningElementRatingInfo tests', () => {
  it('renders correctly', () => {
    const learningElementRatingInfo = render(<LearningElementRatingInfo />)
    expect(learningElementRatingInfo).toBeTruthy()
  })
})
