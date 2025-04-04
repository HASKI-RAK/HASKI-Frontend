import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AccordionSummary } from '@common/components'
import Accordion from './DefaultAccordion'

describe('DefaultAccordion tests', () => {
  test('DefaultAccordion renders correctly', () => {
    const accordion = render(
      <MemoryRouter>
        <Accordion>
          <AccordionSummary>Test</AccordionSummary>
        </Accordion>
      </MemoryRouter>
    )

    expect(accordion).toBeTruthy()
  })
})
