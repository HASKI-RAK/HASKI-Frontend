import { SnackbarContext, SnackbarContextType } from './SnackbarContext'
import { render, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import '@testing-library/jest-dom'

describe('Test SnackbarContext', () => {
  const providedContext = {
    snackbarsErrorWarning: [],
    snackbarsSuccessInfo: [],
    setSnackbarsErrorWarning: jest.fn(),
    setSnackbarsSuccessInfo: jest.fn(),
    addSnackbar: jest.fn(),
    updateSnackbar: jest.fn(),
    removeSnackbar: jest.fn()
  } as SnackbarContextType

  test('SnackbarContext renders correctly', () => {
    const { getByText } = render(
      <SnackbarContext.Provider value={providedContext}>
        <>Test</>
      </SnackbarContext.Provider>
    )

    expect(getByText('Test')).toBeInTheDocument()
  })

  test('SnackbarContext functionality', () => {
    const context = renderHook(() => useContext(SnackbarContext))
    context.result.current.setSnackbarsErrorWarning([])
    context.result.current.setSnackbarsSuccessInfo([])
    context.result.current.addSnackbar({})
    context.result.current.updateSnackbar({})
    context.result.current.removeSnackbar({})

    expect(context.result.current).toMatchObject({
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: expect.any(Function),
      setSnackbarsSuccessInfo: expect.any(Function),
      addSnackbar: expect.any(Function),
      updateSnackbar: expect.any(Function),
      removeSnackbar: expect.any(Function)
    })
  })
})
