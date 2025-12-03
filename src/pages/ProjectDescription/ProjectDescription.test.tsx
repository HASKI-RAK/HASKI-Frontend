import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProjectDescription from './ProjectDescription'

describe('[HASKI-REQ-0083] ProjectDescription tests', () => {
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
