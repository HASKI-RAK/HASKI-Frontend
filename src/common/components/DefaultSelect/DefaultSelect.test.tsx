import { MenuItem } from '@mui/material'
import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, xAPI } from '@services'
import Select from './DefaultSelect'

describe('DefaultSelect tests', () => {
  const sendStatement = jest.fn()

  beforeEach(() => {
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)
  })

  test('DefaultSelect sends statement on click', async () => {
    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Select />
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

  test('DefaultSelect sends statement on change', async () => {
    const { getByRole, getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Select value={'test'}>
            <MenuItem value={'test'} />
            <MenuItem value={'test2'} />
          </Select>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    act(() => {
      fireEvent.mouseDown(getByRole('button'))
    })

    act(() => {
      fireEvent.click(getAllByRole('option')[1])
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
