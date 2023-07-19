import { Home } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Test the Home page', () => {
  test('renders skeleton since no login is present', () => {
    const result = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    result.debug()
    // Expect skeleton to be rendered
    expect(result.container.querySelectorAll('span').length).toEqual(1)
  })
})
