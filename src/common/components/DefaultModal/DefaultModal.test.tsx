import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Modal from './DefaultModal'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultModal tests', () => {
  test('DefaultModal sends statement on close', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <Modal open={true}>
          <></>
        </Modal>
      </MemoryRouter>
    )

    fireEvent.keyDown(getByRole('presentation'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 })

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
