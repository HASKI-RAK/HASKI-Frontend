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
    expect(getAllByTestId('projectDescriptionCard').length).toBe(5)
    expect(getAllByTestId('projectDescriptionStepper').length).toBe(2)
  })
})
