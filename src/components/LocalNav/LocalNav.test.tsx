import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LocalNav from './LocalNav'

describe('LocalNav', () => {
  it('should render the LocalNav', () => {
    const result = render(<LocalNav />)
    expect(result).toBeTruthy()
  })
})
