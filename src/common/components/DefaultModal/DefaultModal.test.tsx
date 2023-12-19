import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Modal from './DefaultModal'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

describe('DefaultModal tests', () => {
  test('DefaultModal sends statement on close', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Modal open={true}>
            <></>
          </Modal>
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
