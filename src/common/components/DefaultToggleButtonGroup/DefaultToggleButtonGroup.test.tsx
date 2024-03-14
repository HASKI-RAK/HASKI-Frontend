import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ToggleButton } from '@common/components'
import { AuthContext, xAPI } from '@services'
import ToggleButtonGroup from './DefaultToggleButtonGroup'

describe('DefaultToggleButtonGroup tests', () => {
  test('DefaultToggleButtonGroup sends statement on change', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

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
