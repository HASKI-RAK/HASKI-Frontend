import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextField from './DefaultTextField'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

describe('DefaultTextField tests', () => {
  test('DefaultTextField sends statement on change', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <TextField value={'test'} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.change(getByRole('textbox'), { target: { value: 'test2' } })
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
