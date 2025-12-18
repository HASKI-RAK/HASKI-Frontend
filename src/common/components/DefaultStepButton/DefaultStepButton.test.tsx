import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StepButton from './DefaultStepButton'

describe('[HASKI-REQ-0086] DefaultStepButton tests', () => {
  test('DefaultStepButton renders correctly', () => {
    const stepButton = render(
      <MemoryRouter>
        <StepButton />
      </MemoryRouter>
    )

    expect(stepButton).toBeTruthy()
  })
})
