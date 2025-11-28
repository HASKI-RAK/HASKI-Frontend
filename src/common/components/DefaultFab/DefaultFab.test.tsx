import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Fab from './DefaultFab'

describe('DefaultFab tests', () => {
  test('DefaultFab renders correctly', () => {
    const fab = render(
      <MemoryRouter>
        <Fab />
      </MemoryRouter>
    )

    expect(fab).toBeTruthy()
  })
})
