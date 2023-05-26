import React from 'react'
import { Contact } from '@pages'
import '@testing-library/jest-dom'
import { render, fireEvent, act } from '@testing-library/react'
import { ContactForm } from '@components'
import { FormDataType } from '@services'
import { useContact } from './Contact.hooks'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        if (key == 'components.ContactForm.types') {
          const reportTypes = [
            { value: '1', label: 'issue' },
            { value: '2', label: 'Spam' }
          ]
          return reportTypes
        } else if (key == 'components.ContactForm.topics') {
          return [
            { value: '1', label: 'Learningelement' },
            { value: '2', label: 'Sexism' }
          ]
        }
        return key
      }
    }
  }
}))
/** use Translation mocks the translation and also mocks the map input of reportTypes and topics,
 * input isnt important here.
 * global.fetch mocks the fetch function, which is used in the onSubmitHandler function in Contact.hooks.tsx
 * useContact mocks the useContact function, which is used in the Contact.tsx
 *
 * Now the two tests handle the case, that the user doesnt send the form, and the case that the user sends the form.
 * Not sending the form is tested by checking if the useContact function is not called.
 * Sending the form is tested by checking if the useContact function is called.
 * The useContact function can only be called if the user fills in the required fields.
 * Which is why this is also mocked here.
 *
 * Last test checks if the fetch function works.
 */
describe('Test Contactpage', () => {
  const submit = jest.fn()

  const useContact = jest.fn(() => {
    return { onSubmitHandler: submit }
  })

  test('not sending', () => {
    render(<Contact />)
    expect(useContact).not.toBeCalled()
  })
  test('test the fetch function', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        status: 200,
        message: 'OK'
      })
    ) as jest.Mock
    const result = await fetch(process.env.BACKEND + `/contactform`)
    await expect(result.status).toBe(200)
  })
  test('sends onSubmit to Contactform', () => {
    const form = render(<ContactForm onSubmit={useContact} />)

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
        },
        status: 404,
        message: 'OK'
      })
    ) as jest.Mock
    const result = await fetch(process.env.BACKEND + `/contactform`)
    await expect(result.status).toBe(404)
  })
})

describe('Test on submit Function', () => {
  const testData: FormDataType = {
    reportType: '1',
    reportTopic: '1',
    description: 'test'
  }
  test('Fetch Return 200', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        message: 'OK'
      })
    ) as jest.Mock

    const onSubmit = useContact()

    onSubmit.onSubmitHandler(testData)
  })

  test('Fetch throws an error', async () => {
    global.fetch = jest.fn(() => {
      throw new Error('Error')
      return Promise.resolve({
        status: 404,
        message: 'OK'
      })
    }) as jest.Mock

    const onSubmit = useContact()

    onSubmit.onSubmitHandler(testData)
  })
})
