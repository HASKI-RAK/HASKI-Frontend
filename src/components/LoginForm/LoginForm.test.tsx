import { act, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import LoginForm from './LoginForm'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    headers: {
      get: () => 'application/json'
    },
    ok: true
  })
) as jest.Mock

describe('Test LoginForm', () => {
  /*
  const validate = jest.fn(
    (username: string, password: string) => [username.length !== 0, password.length !== 0] as const
  )
  test('Login form no input', () => {
    const loginForm = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )
    const [passwordvisibilitybutton, button] = loginForm.getAllByRole('button')
    const username = loginForm.getAllByRole('textbox')[0]
    const password = loginForm.container.querySelector('#login-form-password-textfield') as HTMLElement
    // No input yet so no submit
    fireEvent.click(button)
    expect(validate.mock.calls.length).toEqual(1)
    expect(validate).toBeCalled()
    expect(submit.mock.calls.length).toEqual(0)
    expect(submit).not.toBeCalled()

    // Fill in username
    fireEvent.change(username, { target: { value: 'test' } })
    fireEvent.click(button)
    expect(validate.mock.calls.length).toEqual(2)
    expect(validate).toBeCalled()
    expect(submit.mock.calls.length).toEqual(0)
    expect(submit).not.toBeCalled()

    // Fill in password
    fireEvent.change(password, { target: { value: 'test' } })
    fireEvent.click(button)
    expect(validate.mock.calls.length).toEqual(3)
    expect(validate).toBeCalled()
    expect(submit.mock.calls.length).toEqual(1)
    expect(submit).toBeCalled()

    // Password is hidden
    expect(password.getAttribute('type')).toEqual('password')

    // Click on password visibility button
    fireEvent.click(passwordvisibilitybutton)
    expect(password.getAttribute('type')).toEqual('text')

    // Click on password visibility button
    fireEvent.click(passwordvisibilitybutton)
    expect(password.getAttribute('type')).toEqual('password')
  })

  test('Login form with default values', () => {
    const loginForm = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )
    const button = loginForm.getAllByRole('button')[1]
    const username = loginForm.getAllByRole('textbox')[0]
    const password = loginForm.container.querySelector('#login-form-password-textfield') as HTMLElement
    // No input yet so no submit
    fireEvent.click(button)

    // Fill in username
    fireEvent.change(username, { target: { value: 'test' } })
    fireEvent.click(button)

    // Fill in password
    fireEvent.change(password, { target: { value: 'test' } })
    fireEvent.click(button)

    // submit
    fireEvent.click(button)
  })*/

  test('the moodle login button', () => {
    const navigate = jest.fn()
    const loginForm = render(
      <MemoryRouter>
        <LoginForm moodleLogin onMoodleLogin={navigate} />
      </MemoryRouter>
    )
    // get button with moodle-login-button data-testid
    const buttonLogin = loginForm.getByTestId('moodle-login-button')
    // Click on moodle login button
    act(() => {
      fireEvent.click(buttonLogin)
    })
    expect(navigate).toBeCalled()
  })

  test('the moodle login button with default hook', () => {
    const loginForm = render(
      <MemoryRouter>
        <LoginForm moodleLogin />
      </MemoryRouter>
    )
    // get button with moodle-login-button data-testid
    const buttonLogin = loginForm.getByTestId('moodle-login-button')
    // Click on moodle login button
    act(() => {
      fireEvent.click(buttonLogin)
    })
  })
})
