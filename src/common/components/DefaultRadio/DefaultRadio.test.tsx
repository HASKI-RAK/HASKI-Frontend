import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Radio from './DefaultRadio'

describe('DefaultRadio tests', () => {
  test('DefaultRadio renders correctly', () => {
    const radio = render(
      <MemoryRouter>
        <Radio />
      </MemoryRouter>
    )

    expect(radio).toBeTruthy()
  })
})
