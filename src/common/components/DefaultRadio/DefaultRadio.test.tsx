import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Radio from './DefaultRadio'

describe('[HASKI-REQ-0086] DefaultRadio tests', () => {
  test('DefaultRadio renders correctly', () => {
    const radio = render(
      <MemoryRouter>
        <Radio />
      </MemoryRouter>
    )

    expect(radio).toBeTruthy()
  })
})
