import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MenuItem } from '@mui/material'
import Select from './DefaultSelect'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultSelect tests', () => {
  const sendStatement = jest.fn()

  beforeEach(() => {
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)
  })

  test('DefaultSelect sends statement on click', async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Select />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })

  test('DefaultSelect sends statement on change', async () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Select value={'test'}>
          <MenuItem value={'test'} />
          <MenuItem value={'test2'} />
        </Select>
      </MemoryRouter>
    )

    fireEvent.mouseDown(getByRole('button'))
    fireEvent.click(getAllByRole('option')[1])

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
