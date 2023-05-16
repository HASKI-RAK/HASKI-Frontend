import { SnackbarContext, SnackbarContextType } from '@services'
import { act, fireEvent, render } from '@testing-library/react'
import SnackbarContainer from './SnackbarContainer'
import '@testing-library/jest-dom'

const mockContext = {
  snackbarsErrorWarning: [
    {
      severity: 'error',
      message: 'test',
      autoHideDuration: undefined
    }
  ],
  snackbarsSuccessInfo: [
    {
      severity: 'success',
      message: 'test',
      autoHideDuration: undefined
    }
  ],
  setSnackbarsErrorWarning: jest.fn(),
  setSnackbarsSuccessInfo: jest.fn(),
  addSnackbar: jest.fn(),
  updateSnackbar: jest.fn(),
  removeSnackbar: jest.fn()
} as SnackbarContextType

const mockUseNetworkStatus = jest.fn().mockReturnValue(true)

describe('Test SnackbarContainer', () => {
  test('SnackbarContainer renders on its own', () => {
    const { getByTestId } = render(<SnackbarContainer />)
    const snackbarContainer = getByTestId('snackbarContainer')
    expect(snackbarContainer).toBeInTheDocument()
  })

  test('Lose and retrieve internet connection', () => {
    render(
      <SnackbarContext.Provider value={mockContext}>
        <SnackbarContainer />
      </SnackbarContext.Provider>
    )

    // Simulate loss of internet connection
    act(() => {
      mockUseNetworkStatus.mockReturnValue(false)
      fireEvent(window, new Event('offline'))
    })

    expect(mockContext.addSnackbar).toHaveBeenCalledTimes(2)

    // Simulate retrieval of internet connection
    act(() => {
      mockUseNetworkStatus.mockReturnValue(true)
      fireEvent(window, new Event('online'))
    })

    expect(mockContext.addSnackbar).toHaveBeenCalledTimes(3)
  })
})
