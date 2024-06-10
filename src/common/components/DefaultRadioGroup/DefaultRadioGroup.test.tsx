import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Radio } from '@common/components'
import { AuthContext } from '@services'
import RadioGroup from './DefaultRadioGroup'

describe('DefaultRadioGroup tests', () => {
  test('DefaultRadioGroup sends statement on change', async () => {
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
          <RadioGroup>
            <Radio value={'test'} />
            <Radio value={'test2'} />
          </RadioGroup>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getAllByRole('radio')[0])
      fireEvent.click(getAllByRole('radio')[1])
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
