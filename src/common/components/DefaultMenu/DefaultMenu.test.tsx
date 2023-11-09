import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Menu from './DefaultMenu'
import { xAPI } from '@services'

describe('DefaultMenu tests', () => {
  test('DefaultMenu sends statement on close', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <Menu open={true} />
      </MemoryRouter>
    )

    fireEvent.keyDown(getByRole('menu'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 })

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
fireEvent.mouseDown(document.body)
