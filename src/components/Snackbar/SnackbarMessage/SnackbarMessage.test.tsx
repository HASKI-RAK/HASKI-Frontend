import SnackbarMessage, { SnackbarMessageProps } from './SnackbarMessage'
import { act, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

const mockErrorSnackbarMessageProps: SnackbarMessageProps = {
  autoHideDuration: 10,
  message: 'test',
  severity: 'error'
}

const mockWarningSnackbarMessageProps: SnackbarMessageProps = {
  autoHideDuration: 10,
  message: 'test',
  severity: 'warning'
}

const mockSuccessSnackbarMessageProps: SnackbarMessageProps = {
  autoHideDuration: 0,
  message: 'test',
  severity: 'success'
}

describe('Test SnackbarMessage', () => {
  test('SnackbarMessage renders without input', () => {
    const { queryByText } = render(<SnackbarMessage />)
    const snackbarMessage = queryByText('test')
    expect(snackbarMessage).toEqual(null)
  })

  test('SnackbarMessage renders with error input', () => {
    const { queryByText } = render(<SnackbarMessage {...mockErrorSnackbarMessageProps} />)
    const snackbarMessage = queryByText(
      mockErrorSnackbarMessageProps.severity + ': ' + mockErrorSnackbarMessageProps.message
    )
    expect(snackbarMessage).toBeInTheDocument()
  })

  test('SnackbarMessage renders with warning input', () => {
    const { queryByText } = render(<SnackbarMessage {...mockWarningSnackbarMessageProps} />)
    const snackbarMessage = queryByText(
      mockWarningSnackbarMessageProps.severity + ': ' + mockWarningSnackbarMessageProps.message
    )
    expect(snackbarMessage).toBeInTheDocument()
  })

  test('SnackbarMessage renders with success input', () => {
    const { queryByText } = render(<SnackbarMessage {...mockSuccessSnackbarMessageProps} />)
    const snackbarMessage = queryByText(
      mockSuccessSnackbarMessageProps.severity + ': ' + mockSuccessSnackbarMessageProps.message
    )
    expect(snackbarMessage).toBeInTheDocument()
  })

  test('SnackbarMessage closes after timeout', () => {
    render(<SnackbarMessage {...mockErrorSnackbarMessageProps} />)
    expect(setTimeout).toHaveBeenCalledTimes(2)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(6)
  })

  test('SnackbarMessage closes after button click', () => {
    const { getByRole } = render(<SnackbarMessage {...mockSuccessSnackbarMessageProps} />)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    const button = getByRole('button')
    fireEvent.click(button)

    act(() => {
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalledTimes(4)
  })
})
