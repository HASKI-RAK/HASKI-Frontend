import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MenuItem from './DefaultMenuItem'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultMenuItem tests', () => {
  test('DefaultMenuItem sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <MenuItem />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('menuitem'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
