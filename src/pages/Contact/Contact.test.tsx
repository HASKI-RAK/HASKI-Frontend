import React from 'react'
import { Contact } from '@pages'
import '@testing-library/jest-dom'
import { render, fireEvent, act } from '@testing-library/react'
import { ContactForm } from '@components'
import * as onSubmitHandler from './Contact.hooks'

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

describe('Test Contactpage', () => {
  const submit = jest.fn()
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ status: 200 }),
      status: 200,
      message: 'OK'
    })
  ) as jest.Mock
  beforeEach(() => {
    jest.spyOn(onSubmitHandler, 'useContact').mockImplementation(() => {
      return {
        onSubmitHandler: submit
      }
    })
  })

  test('not sending', () => {
    render(<Contact />)
    expect(submit).not.toBeCalled()
  })
  test('sends onSubmit to Contactform', () => {
    const form = render(<ContactForm onSubmit={submit} />)

    const submitButton = form.getByText('components.ContactForm.submit')
    const input = form.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'text' } })
    fireEvent.mouseDown(form.getByRole('button', { name: /Topic/i }))
    act(() => {
      form.getAllByRole('option')[0].click()
    })
    fireEvent.click(submitButton)
    expect(onSubmitHandler).toBeCalled()
    render(<Contact />)
  })
})
