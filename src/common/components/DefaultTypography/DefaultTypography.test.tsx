import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextWrapper from './TextWrapper'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultTypography tests', () => {
  test('ToggleWrapper sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByTestId } = render(
      <MemoryRouter>
        <TextWrapper data-testid="toggleWrapper" />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('toggleWrapper'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
