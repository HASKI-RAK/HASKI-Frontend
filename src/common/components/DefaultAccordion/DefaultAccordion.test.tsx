import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AccordionSummary } from '@common/components'
import { AuthContext } from '@services'
import { PersistedStoreState, usePersistedStore } from '@store'
import Accordion from './DefaultAccordion'

describe('DefaultAccordion tests', () => {
  test('DefaultAccordion sends statement on click', async () => {
    const xAPI = usePersistedStore((state) => state.getXAPI)()
    const sendStatement = jest.fn()
    jest.spyOn(xAPI!, 'sendStatement').mockImplementation(sendStatement)

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
