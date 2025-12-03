import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Fab from './DefaultFab'

describe('[HASKI-REQ-0086] DefaultFab tests', () => {
  test('DefaultFab renders correctly', () => {
    const fab = render(
      <MemoryRouter>
        <Fab />
      </MemoryRouter>
    )

    expect(fab).toBeTruthy()
  })
})
