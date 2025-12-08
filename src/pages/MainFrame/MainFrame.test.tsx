import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Router, { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@services'
import { MainFrame } from './MainFrame'

const navigate = jest.fn()

//How can i use this mock for only one test without having it in an extra file?
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

jest.mock('common/hooks', () => ({
  useTheme: () => ({
    breakpoints: {
      up: (size: string) => `@media (min-width:${size}px)` // Simulate the 'up' method returning a media query string
    }
  }),
  useMediaQuery: jest.fn().mockReturnValue(true) // Simulate the useMediaQuery hook returning true
}))

describe('[HASKI-REQ-0089] MainFrame', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the MainFrame', () => {
    // mock returns nonsense, so the useParams returns undefined for courseId
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseOrSomething: '2' })

    const result = render(
      <ThemeProvider>
        <MemoryRouter>
          <MainFrame />
        </MemoryRouter>
      </ThemeProvider>
    )
    expect(result).toBeTruthy()
  })

  it('renders with useParams value', () => {
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseId: '2' })

    const { container } = render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/course/2']}>
          <MainFrame />
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(container.textContent).toContain('pages.home/pages.course')
  })
})
