import { act } from 'react-test-renderer'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import ContactForm from './ContactForm'
import { MemoryRouter } from 'react-router-dom'

describe('Test ContactForm', () => {
  const send = jest.fn()

  test('Test default params', () => {
    const form = render(
      <MemoryRouter>
        <ContactForm />
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
    expect(form).toBeTruthy()
  })

  test('submits form correctly', () => {
    const form = render(
      <MemoryRouter>
        <ContactForm onSubmit={send} />
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

    expect(send).toBeCalled()
  })
  test('missing description input', () => {
    const form = render(
      <MemoryRouter>
        <ContactForm onSubmit={send} />
      </MemoryRouter>
    )
    const submitButton = form.getByText('components.ContactForm.submit')
    fireEvent.mouseDown(form.getByRole('button', { name: /Topic/i }))
    act(() => {
      form.getAllByRole('option')[0].click()
    })

    fireEvent.click(submitButton)

    expect(send).not.toBeCalled()
  })

  test('submits form incorrectly', () => {
    const text = '60%'
    const form = render(
      <MemoryRouter>
        <ContactForm onSubmit={send} />
      </MemoryRouter>
    )
    const submitButton = form.getByText('components.ContactForm.submit')

    fireEvent.click(submitButton)
    expect(typeof text).toBe('string')
    expect(send).not.toBeCalled()
  })
  test('check InputChange function', () => {
    const { getAllByRole, getByRole } = render(
      <MemoryRouter>
        <ContactForm />
      </MemoryRouter>
    )
    fireEvent.mouseDown(getByRole('button', { name: /Topic/i }))
    act(() => {
      getAllByRole('option')[0].click()
    })
    expect(getByRole('button', { name: /Topic/i })).toHaveTextContent(/Learningelement/i)
  })

  test('Contactform form no input', () => {
    const contactform = render(
      <MemoryRouter>
        <ContactForm onSubmit={send} />
      </MemoryRouter>
    )
    const submitButton = contactform.getByText('components.ContactForm.submit')
    const reporttype = contactform.getByRole('radio', { name: /issue/i })
    const reporttopic = contactform.getByRole('button', { name: /Topic/i })

    // No input yet so no submit
    fireEvent.mouseDown(reporttype)
    act(() => {
      fireEvent.click(contactform.getByRole('radio', { name: /issue/i }))
    })
    fireEvent.click(submitButton)
    expect(send.mock.calls.length).toEqual(0)
    expect(send).not.toBeCalled()

    // Fill in radio
    fireEvent.click(submitButton)
    expect(send.mock.calls.length).toEqual(0)
    expect(send).not.toBeCalled()

    // Fill in select
    fireEvent.mouseDown(reporttopic)
    act(() => {
      contactform.getAllByRole('option')[0].click()
    })
    //Fill in description
    const input = contactform.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'text' } })

    fireEvent.click(submitButton)
    expect(send.mock.calls.length).toEqual(1)
    expect(send).toBeCalled()
  })
})
