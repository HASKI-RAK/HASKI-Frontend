import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Popover from './DefaultPopover'

describe('[HASKI-REQ-0086] DefaultPopover tests', () => {
  test('DefaultPopover renders correctly', () => {
    const popover = render(
      <MemoryRouter>
        <Popover open={true} anchorEl={document.body} />
      </MemoryRouter>
    )

    expect(popover).toBeTruthy()
  })
})
