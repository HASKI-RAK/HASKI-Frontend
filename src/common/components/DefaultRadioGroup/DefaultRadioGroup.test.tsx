import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RadioGroup from './DefaultRadioGroup'
import { Radio } from '@common/components'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

describe('DefaultRadioGroup tests', () => {
  test('DefaultRadioGroup sends statement on change', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

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
