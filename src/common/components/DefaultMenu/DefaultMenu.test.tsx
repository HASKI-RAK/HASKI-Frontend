import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import Menu from './DefaultMenu'

describe('DefaultMenu tests', () => {
  test('DefaultMenu sends statement on close', async () => {
    const usePersistedStore = jest.fn().mockReturnValue({
      state: {
        getXAPI: () => ({
          sendStatement: jest.fn()
        })
      }
    })

    jest.mock('@store', () => ({
      ...jest.requireActual('@store'),
      usePersistedStore: () => usePersistedStore
    }))

    const sendStatement = usePersistedStore().state.getXAPI.sendStatement

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Menu open={true} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.keyDown(getByRole('menu'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 })
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
fireEvent.mouseDown(document.body)
