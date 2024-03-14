import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, xAPI } from '@services'
import Popover from './DefaultPopover'

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
