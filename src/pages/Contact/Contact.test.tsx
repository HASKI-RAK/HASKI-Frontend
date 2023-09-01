import { Contact } from '@pages'
import '@testing-library/jest-dom'
import { render, fireEvent, act, renderHook } from '@testing-library/react'
import { ContactForm } from '@components'
import { FormDataType, SnackbarContext, SnackbarContextType } from '@services'
import { useContact } from './Contact.hooks'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'

/*jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: (a: any) => a
}))*/

const mockSnackbarContext: SnackbarContextType = {
  snackbarsErrorWarning: [],
  snackbarsSuccessInfo: [],
  setSnackbarsErrorWarning: (a: any[]) => {
    return a
  },
  setSnackbarsSuccessInfo: (a: any) => {
    return a
  },
  addSnackbar: (a: any) => {
    return a
  },
  updateSnackbar: (a: any) => {
    return a
  },
  removeSnackbar: (a: any) => {
    return a
  }
}

/** 
 * useTranslation mocks the translation and also mocks the map input of reportTypes and topics,
 * input isnt important here.
 * global.fetch mocks the fetch function, which is used in the onSubmitHandler function in Contact.hooks.tsx
 * useContact mocks the useContact function, which is used in the Contact.tsx
 * mockSnackbarContext is a mocked Snackbarcontext, which handles the testing of the snackbar, when a form is submitted
 *
 * Currently getting tested are the cases:
 *
 * - Contactform is not getting sent at all. Only renders the form
 * - a form gets submitted, so that the fetch function gets called and returns 201
 * - tests a normal submit with filled in textfields, that are required
 * - a form gets submitted, but throws an error
 *
 * - the fetch function returns 201, but is Loading is false, so the Snackbar shows an error
 */
describe('Test Contactpage', () => {
  const submit = jest.fn()
  const useContact = jest.fn(() => {
    return { onSubmitHandler: submit }
  })

  test('not sending', () => {
    render(
      <SnackbarContext.Provider value={mockSnackbarContext}>
        <Contact />
      </SnackbarContext.Provider>
    )
    expect(useContact).not.toBeCalled()
  })
  test('sends onSubmit to Contactform', () => {
    const form = render(
      <MemoryRouter>
        <SnackbarContext.Provider value={mockSnackbarContext}>
          <ContactForm onSubmit={useContact} />
        </SnackbarContext.Provider>
      </MemoryRouter>
    )

    const submitButton = form.getByText('components.ContactForm.submit')
    const input = form.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'text' } })
    fireEvent.mouseDown(form.getByRole('button', { name: /Topic/i }))
    act(() => {
      form.getAllByRole('option')[0].click()
    })
    fireEvent.click(submitButton)
    expect(useContact).toBeCalled()

    render(<Contact />)
  })

  test('test catch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          throw new Error('Error')
        }
      })
    ) as jest.Mock
    const result = await fetch(process.env.BACKEND + `/contactform`)
    expect(result.status).toBe(undefined)
  })
})

describe('Test on submit Function', () => {
  const testData: FormDataType = {
    report_type: '1',
    report_topic: '1',
    report_description: 'test'
  }
  test('Fetch successful', async () => {
    const loadingMock = jest.fn()
    const addSnackbarMock = jest.fn()

    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    const result = renderHook(
      () => {
        const onSubmit = useContact({ setIsLoading: loadingMock })
        return onSubmit
      },
      { wrapper: ({ children }) => <SnackbarContext.Provider value={my_context}>{children}</SnackbarContext.Provider> }
    )

    const onSubmit = result.result.current
    await act(async () => {
      onSubmit.onSubmitHandler(testData)

      // Check if loading is set True
      expect(loadingMock).lastCalledWith(true)

      // wait for all async calls
      await Promise.resolve()
    })

    expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('success')
    expect(loadingMock).lastCalledWith(false)
  })

  test('Fetch fails', async () => {
    const loadingMock = jest.fn()
    const addSnackbarMock = jest.fn()

    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    const result = renderHook(
      () => {
        const onSubmit = useContact({ setIsLoading: loadingMock })
        return onSubmit
      },
      { wrapper: ({ children }) => <SnackbarContext.Provider value={my_context}>{children}</SnackbarContext.Provider> }
    )

    const onSubmit = result.result.current

    mockServices.getUser = jest.fn().mockImplementationOnce(() => 
     Promise.reject(new Error('get User failed')))
    
    await act(async () => {
      onSubmit.onSubmitHandler(testData)

      // Check if loading is set True
      expect(loadingMock).lastCalledWith(true)

      // wait for all async calls
      await Promise.resolve()
    })

    expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('error')
    expect(loadingMock).lastCalledWith(true)
  })

  test('Fetch throws an error, Snackbar error', async () => {
    /*global.fetch = jest.fn(() => {
      throw new Error('Error')
    }) as jest.Mock*/

    mockServices.postContactForm = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('error')))
    const loadingMock = jest.fn()
    const addSnackbarMock = jest.fn()

    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    const result = renderHook(
      () => {
        const onSubmit = useContact({ setIsLoading: loadingMock })
        return onSubmit
      },
      { wrapper: ({ children }) => <SnackbarContext.Provider value={my_context}>{children}</SnackbarContext.Provider> }
    )

    const onSubmit = result.result.current
    await act(async () => {
      onSubmit.onSubmitHandler(testData)

      await Promise.resolve()
    })

    expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('error')
    expect(loadingMock).lastCalledWith(true)
  })
})
