import { render, fireEvent, waitFor, act } from '@testing-library/react'
import ToggleButtonGroup from './DefaultToggleButtonGroup'
import { ToggleButton } from '@common/components'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

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
