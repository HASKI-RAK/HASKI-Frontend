import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import ProjectTeam from './ProjectTeam'

describe('ProjectTeam tests', () => {
  test('ProjectTeam renders', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ProjectTeam />
      </MemoryRouter>
    )
    expect(getAllByTestId('projectDescriptionCard').length).toBe(4)
    expect(getAllByTestId('projectDescriptionStepper').length).toBe(3)
    expect(getAllByTestId('projectTeamCompetenciesCard').length).toBe(1)
    expect(getAllByTestId('ImageAttribute').length).toBe(1)
  })
})
