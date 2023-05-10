import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ProjectDescriptionForm from './ProjectDescriptionForm'

describe('ProjectDescriptionForm tests', () => {
  test('ProjectDescriptionForm renders', () => {
    const { getByTestId } = render(<ProjectDescriptionForm />)
    const projectDescriptionForm = getByTestId('projectDescriptionForm')

    expect(projectDescriptionForm).toBeInTheDocument()
  })
})
