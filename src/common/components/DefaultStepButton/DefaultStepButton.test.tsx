import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StepButton from './DefaultStepButton'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultStepButton tests', () => {
  test('DefaultStepButton sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <StepButton />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
