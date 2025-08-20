import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HaskiTheme } from '@common/utils'
import { AuthContext, ThemeProvider } from '@services'
import ThemeModal from './ThemeModal'

// mock translation to return key
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('ThemeModal tests', () => {
  test('should render ThemeModal, closed', () => {
    const themeModal = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <ThemeModal
              handleClose={jest.fn()}
              selectedTheme={HaskiTheme}
              selectedThemeString={'HaskiTheme'}
              setSelectedThemeString={jest.fn()}
              setSelectedTheme={jest.fn()}
            />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(themeModal).toBeTruthy()
  })

  test('should render ThemeModal, opened', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <ThemeModal
              open={true}
              handleClose={jest.fn()}
              selectedTheme={HaskiTheme}
              selectedThemeString={'HaskiTheme'}
              setSelectedThemeString={jest.fn()}
              setSelectedTheme={jest.fn()}
            />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(getByTestId('ThemeModal-Close-Button')).toBeInTheDocument()
  })

  test('clicking on next and previous arrow buttons', async () => {
    const setSelectedTheme = jest.fn()
    const setSelectedThemeString = jest.fn()
    const handleClose = jest.fn()

    const { getByTestId, getByLabelText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <ThemeModal
              open={true}
              handleClose={handleClose}
              selectedTheme={HaskiTheme}
              selectedThemeString={'HaskiTheme'}
              setSelectedThemeString={setSelectedThemeString}
              setSelectedTheme={setSelectedTheme}
            />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(getByTestId('ThemeModal-Close-Button')).toBeInTheDocument()
    expect(getByTestId('ThemeModal-Right-Button')).toBeInTheDocument()
    expect(getByTestId('ThemeModal-Left-Button')).toBeInTheDocument()

    fireEvent.click(getByTestId('ThemeModal-Right-Button'))
    await waitFor(() => {
      fireEvent.click(getByTestId('ThemeModal-Left-Button'))
    })
    await waitFor(() => {
      fireEvent.click(getByLabelText('components.ThemeModal.darkTheme'))
      expect(setSelectedTheme).toHaveBeenCalled()
      expect(setSelectedThemeString).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(getByTestId('ThemeModal-Accept-Button')).toBeEnabled()
    })
  })

  test('clicking on a theme and accept button', async () => {
    const setSelectedTheme = jest.fn()
    const setSelectedThemeString = jest.fn()
    const handleClose = jest.fn()

    const { getByTestId, getByLabelText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <ThemeModal
              open={true}
              handleClose={handleClose}
              selectedTheme={HaskiTheme}
              selectedThemeString={'HaskiTheme'}
              setSelectedThemeString={setSelectedThemeString}
              setSelectedTheme={setSelectedTheme}
            />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      fireEvent.click(getByLabelText('components.ThemeModal.darkTheme'))
      expect(setSelectedTheme).toHaveBeenCalled()
      expect(setSelectedThemeString).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(getByTestId('ThemeModal-Accept-Button')).toBeEnabled()
      fireEvent.click(getByTestId('ThemeModal-Accept-Button'))
    })
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled()
    })
  })
})
