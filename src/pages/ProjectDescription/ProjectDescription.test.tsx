import ProjectDescription from './ProjectDescription'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ProjectDescription tests', () => {
  test('ProjectDescription renders', () => {
    const { getAllByTestId } = render(<ProjectDescription />)
    expect(getAllByTestId('projectDescriptionCard').length).toBe(5)
    expect(getAllByTestId('projectDescriptionStepper').length).toBe(2)
    expect(getAllByTestId('ImageAttribute').length).toBe(1)
  })
})
