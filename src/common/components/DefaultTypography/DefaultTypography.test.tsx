import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextWrapper from './TextWrapper'

describe('[HASKI-REQ-0086] DefaultTypography tests', () => {
  test('TextWrapper renders correctly', () => {
    const textWrapper = render(
      <MemoryRouter>
        <TextWrapper />
      </MemoryRouter>
    )

    expect(textWrapper).toBeTruthy()
  })
})
