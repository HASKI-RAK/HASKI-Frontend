import { render, fireEvent, waitFor } from '@testing-library/react'
import { AccordionSummary } from '@common/components'
import { MemoryRouter } from 'react-router-dom'
import Accordion from './DefaultAccordion'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultAccordion tests', () => {
  test('DefaultAccordion sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <MemoryRouter>
        <Accordion>
          <AccordionSummary>Test</AccordionSummary>
        </Accordion>
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
