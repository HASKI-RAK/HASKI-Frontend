import { render, fireEvent, waitFor } from '@testing-library/react'
import ToggleButtonGroup from './DefaultToggleButtonGroup'
import { ToggleButton } from '@common/components'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultToggleButtonGroup tests', () => {
  test('DefaultToggleButtonGroup sends statement on change', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getAllByRole } = render(
      <MemoryRouter>
        <ToggleButtonGroup value={'test'}>
          <ToggleButton value={'test'} />
          <ToggleButton value={'test2'} />
        </ToggleButtonGroup>
      </MemoryRouter>
    )

    fireEvent.click(getAllByRole('button')[1])

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
