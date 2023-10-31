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
    const { queryAllByText } = render(<SnackbarContainer />)
    expect(queryAllByText('error: test').length).toEqual(0)
    expect(queryAllByText('success: test').length).toEqual(0)
  })

  test('Lose and retrieve internet connection', () => {
    const { queryAllByText } = render(
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
    expect(queryAllByText('error: test').length).toEqual(1)
    expect(queryAllByText('success: test').length).toEqual(1)
  })
})
