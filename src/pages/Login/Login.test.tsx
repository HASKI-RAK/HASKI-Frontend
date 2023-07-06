import { Login } from '@pages'
import '@testing-library/jest-dom'
import { act, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as router from 'react-router'
const { AuthContext } = jest.requireActual('@services')
import { mockServices } from 'jest.setup'

const navigate = jest.fn()

describe('Login Page', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('should render the login page but throw an error when the backend fails', () => {
    const mock = jest.fn(() => {
      return Promise.reject(new Error('login failed'))
    })
    mockServices.postLogin.mockImplementationOnce(mock)

    render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(mock).rejects.toThrow('login failed')
  })

  test('should render the login page', () => {
    render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(mockServices.postLogin).toHaveBeenCalledTimes(1)
  })

  it('should render the skeleton when a nonce is supplied as search params', () => {
    const login = render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    // span length should be 1
    expect(login.container.querySelectorAll('span').length).toEqual(1)
    // useEffect login try should be called once
    expect(mockServices.postLogin).toHaveBeenCalledTimes(1)
  })

  it('should render the skeleton with nonce and authorized', () => {
    const login = render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(login.container.querySelectorAll('span').length).toEqual(1)
  })

  it('should render the form without nonce but authorized', () => {
    const login = render(
      <MemoryRouter initialEntries={['']}>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(login.container.querySelectorAll('span').length).toEqual(9)
  })

  test('submit navigates to dashboard on correct username and password', () => {
    const login = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    const buttonLogin = login.getAllByRole('button')[1]
    const username = login.getAllByRole('textbox')[0]
    const password = login.container.querySelector('#password') as HTMLElement

    act(() => {
      // Fill in username
      fireEvent.change(username, { target: { value: 'Thomas' } })

      // Fill in password
      fireEvent.change(password, { target: { value: 'Tester' } })
    })

    // Click on login button
    act(() => {
      fireEvent.click(buttonLogin)
    })
    // expect nothing since not implemented
  })

  test('moodle default login failed', () => {
    window = Object.create(window)
    const url = 'http://fakedomain.com'
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      },
      writable: true
    })
    window.location.replace = jest.fn()
    const mock = jest.fn(() => {
      return Promise.reject(new Error('moodel login failed'))
    })
    mockServices.redirectMoodleLogin.mockImplementationOnce(mock)

    const login = render(
      <MemoryRouter initialEntries={['']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    // test id moodle-login
    // const buttonLogin = login.getByTestId("moodle-login-button");
    const buttonLogin = login.getAllByRole('button')[2]

    // Click on login button
    act(() => {
      fireEvent.click(buttonLogin)
    })
    // wait for the fetch to complete
    setTimeout(() => {
      expect(window.location.replace).toBeCalled()
    }, 1000)
    expect(mock).rejects.toThrow('moodel login failed')
  })

  test('moodle default login', () => {
    window = Object.create(window)
    const url = 'http://fakedomain.com'
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      },
      writable: true
    })
    window.location.replace = jest.fn()

    const login = render(
      <MemoryRouter initialEntries={['']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    // test id moodle-login
    // const buttonLogin = login.getByTestId("moodle-login-button");
    const buttonLogin = login.getAllByRole('button')[2]

    // Click on login button
    act(() => {
      fireEvent.click(buttonLogin)
    })
    // wait for the fetch to complete
    setTimeout(() => {
      // navigate should be called with /dashboard
      expect(window.location.replace).toBeCalled()
    }, 1000)
  })

  test('the hook should redirect to /login when a nonce is supplied as search params and unauthorized', () => {
    const mock = jest.fn(() => {
      return Promise.reject(new Error('unauthorized'))
    })
    mockServices.postLogin.mockImplementationOnce(mock)
    const login = render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(login.container.querySelectorAll('span').length).toEqual(1)
    // wait for the fetch to complete
    setTimeout(() => {
      // navigate should be called with /dashboard
      expect(navigate).toBeCalledWith('/login')
    }, 1000)

    expect(mock).rejects.toThrow('unauthorized')
  })
})
