import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListItemButton from './DefaultListItemButton'

describe('[HASKI-REQ-0086] DefaultListItemButton tests', () => {
  test('DefaultListItemButton renders correctly', () => {
    const litItemButton = render(
      <MemoryRouter>
        <ListItemButton />
      </MemoryRouter>
    )

    expect(litItemButton).toBeTruthy()
  })
})
