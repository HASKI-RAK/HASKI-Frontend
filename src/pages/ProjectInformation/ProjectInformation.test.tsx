import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import ProjectInformation from './ProjectInformation'

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

  test('third button navigates to about us page', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/home', '/projectinformation']}>
        <ProjectInformation />
      </MemoryRouter>
    )
    fireEvent.click(getAllByRole('button')[2])
    expect(navigate).toBeCalledWith('/projectinformation/aboutus')
  })
})
