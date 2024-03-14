import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, xAPI } from '@services'
import Link from './DefaultLink'

describe('DefaultLink tests', () => {
  test('DefaultLink sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Link data-testid="link" />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getByTestId('link'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
