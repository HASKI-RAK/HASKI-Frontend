import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectTeam from "./ProjectTeam";

describe('ProjectTeam tests', () => {
  test('ProjectTeam renders', () => {
    const { getAllByTestId } = render(<ProjectTeam />)
    expect(getAllByTestId('projectDescriptionCard').length).toBe(4)
    expect(getAllByTestId('projectDescriptionStepper').length).toBe(3)
    expect(getAllByTestId('projectTeamCompetenciesCard').length).toBe(1)
    expect(getAllByTestId('ImageAttribute').length).toBe(1)
  })
})
