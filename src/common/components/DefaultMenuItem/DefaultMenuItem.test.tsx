import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, xAPI } from '@services'
import MenuItem from './DefaultMenuItem'

describe('DefaultMenuItem tests', () => {
  test('DefaultMenuItem sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuItem />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getByRole('menuitem'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
