import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import TextField from './DefaultTextField'

describe('DefaultTextField tests', () => {
  test('DefaultTextField sends statement on change', async () => {
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
