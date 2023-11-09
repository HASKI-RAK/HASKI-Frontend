import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Fab from './DefaultFab'
import { xAPI } from '@services'

describe('DefaultFab tests', () => {
  test('DefaultFab sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <Fab />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
