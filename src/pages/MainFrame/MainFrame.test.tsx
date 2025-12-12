import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@services'
import { MainFrame } from '@pages'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn()
}))

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    })
  })
})

describe('MainFrame', () => {
  it('should render the MainFrame', async () => {
    const result = render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/courseOrSomething/2']}>
          <Routes>
            <Route path="/courseOrSomething/:courseOrSomething" element={<MainFrame />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(result).toBeTruthy()
  })

  it('renders with useParams value', async () => {
    const { container } = render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/topic/2']}>
          <Routes>
            <Route path="/topic/:topicId" element={<MainFrame />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(container.textContent).toContain('pages.home/pages.topic')
  })
})
