import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Popover from './DefaultPopover'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultPopover tests', () => {
  test('DefaultPopover sends statement on close', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <Popover open={true} />
      </MemoryRouter>
    )

    fireEvent.keyDown(getByRole('presentation'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 })

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
