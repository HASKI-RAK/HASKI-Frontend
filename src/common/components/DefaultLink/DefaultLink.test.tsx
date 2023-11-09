import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Link from './DefaultLink'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultLink tests', () => {
  test('DefaultLink sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByTestId } = render(
      <MemoryRouter>
        <Link data-testid="link" />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('link'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
