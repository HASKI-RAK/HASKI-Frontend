import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AltTheme, DarkTheme, HaskiTheme } from '@common/utils'
import { AuthContext, ThemeProvider } from '@services'
import ThemeModal from './ThemeModal'

// mock translation to return key
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

/*
jest.mock('@mui/material', () => ({
  //...jest.requireActual('@mui/material'),
  useTheme: () => ({DarkTheme})
}));
*/

// mockUseTheme = jest.fn(() => DarkTheme)

//jest.spyOn(require('@mui/material/styles'),'useTheme').mockReturnValue(DarkTheme)

describe('Rendering tests', () => {
  test('should match the snapshot', () => {
    const modalElement = render(
      <ThemeProvider>
        <MuiThemeProvider theme={AltTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )

    const { asFragment } = modalElement
    expect(asFragment()).toMatchSnapshot()
  })

  test('interactive elements to be present', () => {
    render(
      <ThemeProvider>
        <MuiThemeProvider theme={AltTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )

    const header = screen.getByText(/radioHeader/i)
    expect(header).toBeInTheDocument()

    const button1 = screen.getByLabelText(/standardTheme/i)
    expect(button1).toBeInTheDocument()

    const button2 = screen.getByLabelText(/darkTheme/i)
    expect(button2).toBeInTheDocument()

    const button3 = screen.getByLabelText(/altTheme/i)
    expect(button3).toBeInTheDocument()

    const closeButton = screen.getByTestId('ThemeModal-Close-Button')
    expect(closeButton).toBeInTheDocument()

    const acceptButton = screen.getByTestId('ThemeModal-Accept-Button')
    expect(acceptButton).toBeInTheDocument()

    const leftButton = screen.getByTestId('ThemeModal-Left-Button')
    expect(leftButton).toBeInTheDocument()

    const rightButton = screen.getByTestId('ThemeModal-Right-Button')
    expect(rightButton).toBeInTheDocument()
  })

  //test('preview pages to be present')
})

describe('Functionality tests', () => {
  test('accept button to be disabled when preview theme equal to active theme', () => {
    //needs mock-fn of useTheme to pass DarkTheme back
    //didnt work so far
    // Mock the useTheme function
    jest.mock('@mui/material/styles', () => ({
      ...jest.requireActual('@mui/material/styles'),
      useTheme: () => DarkTheme // Mocking the return value
    }))

    render(
      <ThemeProvider>
        <MuiThemeProvider theme={AltTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )

    const radioButton = screen.getByLabelText(/standardTheme/i)
    const acceptButton = screen.getByTestId('ThemeModal-Accept-Button')

    expect(acceptButton).toBeDisabled()
    expect(radioButton).toBeChecked()
  })

  test('buttons to be selected after clicking them', async () => {
    render(
      <ThemeProvider>
        <MuiThemeProvider theme={HaskiTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )

    const RadioButton1 = screen.getByLabelText(/standardTheme/i) as HTMLInputElement
    const RadioButton2 = screen.getByLabelText(/darkTheme/i) as HTMLInputElement
    const RadioButton3 = screen.getByLabelText(/altTheme/i) as HTMLInputElement

    //checks StandardThemeButton
    await waitFor(() => {
      fireEvent.click(RadioButton1)
      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(false)
      expect(RadioButton3.checked).toBe(false)
    })

    //checks darkThemeButton
    await waitFor(() => {
      fireEvent.click(RadioButton2)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton1.checked).toBe(false)
      expect(RadioButton3.checked).toBe(false)
    })

    //checks altThemeButton
    await waitFor(() => {
      fireEvent.click(RadioButton3)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton2.checked).toBe(false)
      expect(RadioButton1.checked).toBe(false)
    })
  })

  test('modal to be closed after clicking accept', async () => {
    const handleClose = jest.fn()

    render(
      <ThemeProvider>
        <MuiThemeProvider theme={AltTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={handleClose} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )

    const RadioButton1 = screen.getByLabelText(/darkTheme/i) as HTMLInputElement
    const acceptButton = screen.getByTestId('ThemeModal-Accept-Button')

    await waitFor(() => {
      fireEvent.click(RadioButton1)
      expect(RadioButton1.checked).toBe(true)
      expect(acceptButton).not.toBeDisabled()
    })

    await waitFor(() => {
      fireEvent.click(acceptButton)
      expect(handleClose).toHaveBeenCalled()
    })
  })

  test('preview to deploy the same theme on startup as set by app', () => {
    render(
      <ThemeProvider>
        <MuiThemeProvider theme={AltTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )
    //screen.debug()

    const radioButton1 = screen.getByLabelText(/standardTheme/i) as HTMLInputElement
    expect(radioButton1.checked).toBe(true)
  })

  test('switching preview pages', async () => {
    render(
      <ThemeProvider>
        <MuiThemeProvider theme={HaskiTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    )

    const leftButton = screen.getByTestId('ThemeModal-Left-Button')
    const rightButton = screen.getByTestId('ThemeModal-Right-Button')
    const grid = screen.getByTestId('page-preview-grid')

    expect(grid).toBeInTheDocument()
    expect(grid).toHaveTextContent('Presentation')

    await waitFor(() => {
      fireEvent.click(rightButton)
      expect(grid).toHaveTextContent('Regensburg')
    })
  })

  /*
  test('checking theme on pages', async () => {
    render(
      <ThemeContextProvider>
        <ThemeProvider theme={HaskiTheme}>
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <ThemeModal open={true} handleClose={jest.fn()} />
            </AuthContext.Provider>
          </MemoryRouter>
        </ThemeProvider>
      </ThemeContextProvider>
    )

    const leftButton = screen.getByTestId('ThemeModal-Left-Button')
    const rightButton = screen.getByTestId('ThemeModal-Right-Button')
    const grid = screen.getByTestId('page-preview-grid')
    const theme = useTheme()
    const RadioButton1 = screen.getByLabelText(/darkTheme/i) as HTMLInputElement

    expect(grid).toBeInTheDocument()
    expect(grid).toHaveTextContent('Presentation')

    expect(theme).toBeEqual(HaskiTheme)

    await waitFor(() => {
      fireEvent.click(RadioButton1)
      expect(RadioButton1.checked).toBe(true)
    })

    await waitFor(() => {
      fireEvent.click(rightButton)
      expect(grid).toHaveTextContent('Regensburg')
    })

  })
  */

  //expect(screen.getByTestId('ThemeModal-Accept-Button')).not.toBeInTheDocument ggf querySelector
  //ggf waitFor nr 2 einbauen
})
