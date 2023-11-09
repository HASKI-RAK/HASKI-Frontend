import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Button from './DefaultButton'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultButton tests', () => {
  test('DefaultButton sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <Button />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
