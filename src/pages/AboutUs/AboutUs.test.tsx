import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AboutUs from './AboutUs'

describe('[HASKI-REQ-0083] AboutUs', () => {
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
