import '@testing-library/jest-dom'
import { act, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
  test('the moodle login button', () => {
    const navigate = jest.fn()
    const loginForm = render(
      <MemoryRouter>
        <LoginForm onMoodleLogin={navigate} />
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
        <LoginForm />
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
