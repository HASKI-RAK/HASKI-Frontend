import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, xAPI } from '@services'
import Fab from './DefaultFab'

describe('DefaultFab tests', () => {
  test('DefaultFab sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Fab />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getByRole('button'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
