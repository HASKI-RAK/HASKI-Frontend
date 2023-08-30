import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import MainFrame from './MainFrame'
import Router, { MemoryRouter } from 'react-router-dom'

const navigate = jest.fn()

//How can i use this mock for only one test without having it in an extra file?
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('MainFrame', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the MainFrame', () => {
    // mock returns nonsense, so the useParams returns undefined for courseId
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseOrSomething: '2' })

    const result = render(
      <MemoryRouter>
        <MainFrame />
      </MemoryRouter>
    )
    expect(result).toBeTruthy()
  })

  it('renders with useParams value', () => {
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseId: '2' })

    const { container } = render(
      <MemoryRouter initialEntries={['/course/2']}>
        <MainFrame />
      </MemoryRouter>
    )

    expect(container.textContent).toContain('pages.home/pages.course/pages.2')
  })
})
