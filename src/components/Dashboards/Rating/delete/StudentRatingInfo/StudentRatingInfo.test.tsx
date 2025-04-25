import { render } from '@testing-library/react'
import StudentRatingInfo from './StudentRatingInfo'

describe('StudentRatingInfo tests', () => {
  it('renders correctly', () => {
    const studentRatingInfo = render(<StudentRatingInfo />)
    expect(studentRatingInfo).toBeTruthy()
  })
})
