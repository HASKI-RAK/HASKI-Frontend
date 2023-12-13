import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Popover from './DefaultPopover'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

describe('DefaultPopover tests', () => {
  test('DefaultPopover sends statement on close', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Popover open={true} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.keyDown(getByRole('presentation'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 })
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
