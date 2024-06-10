import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FurtherInfoMenu from './FurtherInfoMenu'

describe('FurtherInfoMenu tests', () => {
  it('renders correctly', () => {
    const furtherInfoMenu = render(
      <MemoryRouter>
        <FurtherInfoMenu />
      </MemoryRouter>
    )

    expect(furtherInfoMenu).toBeTruthy()
  })
})
