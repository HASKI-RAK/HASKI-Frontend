import { fireEvent, render } from '@testing-library/react'
import ProjectInformation from './ProjectInformation'
import { MemoryRouter } from 'react-router-dom'
import * as router from 'react-router'
import '@testing-library/jest-dom'

const navigate = jest.fn()
beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('ProjectInformation tests', () => {
  it('render correctly', () => {
    const projectInformation = render(
      <MemoryRouter>
        <ProjectInformation />
      </MemoryRouter>
    )
    expect(projectInformation).toBeTruthy()
  })

  test('first button navigates to ProjectDescription page', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/home', '/projectinformation']}>
        <ProjectInformation />
      </MemoryRouter>
    )

    fireEvent.click(getAllByRole('button')[0])
    expect(navigate).toBeCalledWith('/projectinformation/projectdescription')
  })

  test('second button navigates to Glossary page', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/home', '/projectinformation']}>
        <ProjectInformation />
      </MemoryRouter>
    )
    fireEvent.click(getAllByRole('button')[1])
    expect(navigate).toBeCalledWith('/projectinformation/glossary')
  })
})
