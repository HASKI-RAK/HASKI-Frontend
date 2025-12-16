import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import SnackbarTransition, { SnackbarTransitionProps } from './SnackbarTransition'

const mockErrorSnackbarTransitionProps: SnackbarTransitionProps = {
  children: <div>test</div>,
  in: true,
  severity: 'error',
  timeout: 10
}

const mockSuccessSnackbarTransitionProps: SnackbarTransitionProps = {
  children: <div>test</div>,
  in: true,
  severity: 'success',
  timeout: 10
}

describe('[HASKI-REQ-0086] SnackbarTransition tests', () => {
  test('SnackbarTransition renders without input', () => {
    const { getByTestId } = render(<SnackbarTransition />)
    const snackbarTransition = getByTestId('snackbarTransition')
    expect(snackbarTransition).toBeInTheDocument()
  })

  test('SnackbarTransition renders with error input', () => {
    const { getByTestId } = render(<SnackbarTransition {...mockErrorSnackbarTransitionProps} />)
    const snackbarTransition = getByTestId('snackbarTransition')
    expect(snackbarTransition).toBeInTheDocument()
  })

  test('SnackbarTransition renders with success input', () => {
    const { getByTestId } = render(<SnackbarTransition {...mockSuccessSnackbarTransitionProps} />)
    const snackbarTransition = getByTestId('snackbarTransition')
    expect(snackbarTransition).toBeInTheDocument()
  })
})
