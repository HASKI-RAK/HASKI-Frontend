import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextField from './DefaultTextField'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultTextField tests', () => {
  test('DefaultTextField sends statement on change', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <TextField value={'test'} />
      </MemoryRouter>
    )

    fireEvent.change(getByRole('textbox'), { target: { value: 'test2' } })

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
