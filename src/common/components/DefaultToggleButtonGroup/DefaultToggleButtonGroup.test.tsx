import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ToggleButton } from '@common/components'
import { AuthContext } from '@services'
import ToggleButtonGroup from './DefaultToggleButtonGroup'

describe('DefaultToggleButtonGroup tests', () => {
  test('DefaultToggleButtonGroup sends statement on change', async () => {
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

    const { getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <ToggleButtonGroup value={'test'}>
            <ToggleButton value={'test'} />
            <ToggleButton value={'test2'} />
          </ToggleButtonGroup>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getAllByRole('button')[1])
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
