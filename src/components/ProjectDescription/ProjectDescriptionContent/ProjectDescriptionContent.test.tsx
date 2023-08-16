import ProjectDescriptionContent from './ProjectDescriptionContent'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ProjectDescriptionContent tests', () => {
  test('ProjectDescriptionContent renders', () => {
    const { getAllByTestId } = render(<ProjectDescriptionContent />)
    expect(getAllByTestId('projectDescriptionCard').length).toBe(5)
    expect(getAllByTestId('projectDescriptionStepper').length).toBe(2)
  })
})
