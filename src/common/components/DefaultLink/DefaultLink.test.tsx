import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Link from './DefaultLink'

describe('DefaultLink tests', () => {
  test('DefaultLink renders correctly', () => {
    const link = render(
      <MemoryRouter>
        <Link data-testid="link" />
      </MemoryRouter>
    )

    expect(link).toBeTruthy()
  })
})
