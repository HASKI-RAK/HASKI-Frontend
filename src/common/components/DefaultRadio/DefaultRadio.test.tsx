import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Popover from './DefaultRadio'

describe('DefaultPopover tests', () => {
  test('DefaultPopover renders correctly', () => {
    const popover = render(
      <MemoryRouter>
        <Popover />
      </MemoryRouter>
    )

    expect(popover).toBeTruthy()
  })
})
