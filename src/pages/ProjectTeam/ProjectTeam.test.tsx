import ProjectDescription from './ProjectTeam'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ProjectDescription tests', () => {
  test('ProjectDescription renders', () => {
    const { getAllByTestId } = render(<ProjectDescription />)
    expect(getAllByTestId('projectDescriptionCard').length).toBe(4)
    expect(getAllByTestId('projectDescriptionStepper').length).toBe(3)
    expect(getAllByTestId('CollapsibleTextMultiList').length).toBe(1)
    expect(getAllByTestId('ImageAttribute').length).toBe(1)
    expect(getAllByTestId('ImageCollection').length).toBe(1)
  })
})
