import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import StepButton from './DefaultStepButton'

describe('DefaultStepButton tests', () => {
  test('DefaultStepButton sends statement on click', async () => {
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
          <StepButton />
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
