import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { AccordionSummary } from '@common/components'
import { MemoryRouter } from 'react-router-dom'
import Accordion from './DefaultAccordion'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

describe('DefaultAccordion tests', () => {
  test('DefaultAccordion sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Accordion>
            <AccordionSummary>Test</AccordionSummary>
          </Accordion>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getByRole('button'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
