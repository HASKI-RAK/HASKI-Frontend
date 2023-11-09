import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RadioGroup from './DefaultRadioGroup'
import { Radio } from '@common/components'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultRadioGroup tests', () => {
  test('DefaultRadioGroup sends statement on change', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getAllByRole } = render(
      <MemoryRouter>
        <RadioGroup>
          <Radio value={'test'} />
          <Radio value={'test2'} />
        </RadioGroup>
      </MemoryRouter>
    )

    fireEvent.click(getAllByRole('radio')[0])
    fireEvent.click(getAllByRole('radio')[1])

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
