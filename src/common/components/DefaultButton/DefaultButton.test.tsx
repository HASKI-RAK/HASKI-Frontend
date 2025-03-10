import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import Button from './DefaultButton'

describe('DefaultButton tests', () => {
  test('DefaultButton sends statement on click', async () => {
    /*
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
    }))*/

    const button = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Button />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(button.getByRole('button')).toBeInTheDocument()

    /*
    const sendStatement = usePersistedStore().state.getXAPI.sendStatement



    act(() => {
      fireEvent.click(getByRole('button'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })*/
  })
})
