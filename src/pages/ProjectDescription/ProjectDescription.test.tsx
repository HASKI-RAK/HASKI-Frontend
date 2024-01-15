import ProjectDescription from './ProjectDescription'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ProjectDescription tests', () => {
  test('ProjectDescription renders', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ProjectDescription />
      </MemoryRouter>
    )
    expect(getAllByTestId('textCardLeft').length).toBe(2)
    expect(getAllByTestId('textCardRight').length).toBe(3)
    expect(getAllByTestId('textStepper').length).toBe(2)
  })
})
