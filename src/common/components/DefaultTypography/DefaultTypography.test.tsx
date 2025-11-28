import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextWrapper from './TextWrapper'

describe('DefaultTypography tests', () => {
  test('TextWrapper renders correctly', () => {
    const textWrapper = render(
      <MemoryRouter>
        <TextWrapper />
      </MemoryRouter>
    )

    expect(textWrapper).toBeTruthy()
  })
})
