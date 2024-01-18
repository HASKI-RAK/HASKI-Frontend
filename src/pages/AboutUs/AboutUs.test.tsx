import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutUs from './AboutUs'

describe('AboutUs', () => {
  it('renders correctly', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    )

    expect(getAllByTestId('textCardLeft').length).toBe(2)
    expect(getAllByTestId('textCardRight').length).toBe(2)
    expect(getAllByTestId('textStepper').length).toBe(1)
    expect(getAllByTestId('collapsibleList').length).toBe(1)
  })
})
