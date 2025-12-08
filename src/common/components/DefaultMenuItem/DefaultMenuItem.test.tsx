import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MenuItem from './DefaultMenuItem'

describe('[HASKI-REQ-0086] DefaultMenuItem tests', () => {
  test('DefaultMenuItem renders correctly', () => {
    const menuItem = render(
      <MemoryRouter>
        <MenuItem />
      </MemoryRouter>
    )

    expect(menuItem).toBeTruthy()
  })
})
