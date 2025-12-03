import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { Login } from '@pages'

const { AuthContext } = jest.requireActual('@services')

const navigate = jest.fn()

describe('[HASKI-REQ-0028] Login Page', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('should render the login page but throw an error when the backend fails', () => {
    const mock = jest.fn(() => Promise.reject(new Error('login failed')))
    mockServices.postLogin.mockImplementationOnce(mock)

    render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(mock).toHaveBeenCalledTimes(1)
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
    const mock = jest.fn(() => Promise.reject(new Error('moodel login failed')))
    mockServices.fetchRedirectMoodleLogin.mockImplementationOnce(mock)

    const login = render(
      <MemoryRouter initialEntries={['']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    // test id moodle-login
    // const buttonLogin = login.getByTestId("moodle-login-button");
    const buttonLogin = login.getAllByRole('button')[0]

    // Click on login button
    act(() => {
      fireEvent.click(buttonLogin)
    })
    // wait for the fetch to complete
    setTimeout(() => {
      expect(window.location.replace).toBeCalled()
    }, 1000)
    expect(mock).toBeCalledTimes(1)
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
    const buttonLogin = login.getAllByRole('button')[0]

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
    const mock = jest.fn(() => Promise.reject(new Error('unauthorized')))
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

    expect(mock).toBeCalledTimes(1)
  })

  test('popup window should be opened when login button is clicked', () => {
    window = Object.create(window)
    const url = 'http://fakedomain.com'
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      },
      writable: true
    })
    window.open = jest.fn(() => Object.create(window))
    window.addEventListener = jest.fn()
    window.location.reload = jest.fn()
    window.focus = jest.fn()
    window.close = jest.fn()
    const login = render(
      <MemoryRouter initialEntries={['']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const buttonLogin = login.getAllByTestId('moodle-login-button')[0]

    act(() => {
      fireEvent.click(buttonLogin)
    })
    setTimeout(() => {
      expect(window.open).toBeCalled()
      expect(window.addEventListener).toBeCalled()
      expect(window.focus).toBeCalled()
    }, 1000)
  })

  it('should navigate to the home page after successful login', async () => {
    const popupWindow = Object.create(window)
    window.open = jest.fn(() => popupWindow)
    window.focus = jest.fn()
    window.close = jest.fn()
    const mockEventListener = jest.fn((event, callback) => {
      // Call the callback function with a mock event object that has source = Window{}
      callback({ data: 'login_success', source: popupWindow })
    })
    jest.spyOn(window, 'addEventListener').mockImplementation(mockEventListener)

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const moodleLoginButton = getByTestId('moodle-login-button')
    fireEvent.click(moodleLoginButton)

    // Simulate the successful login event
    const messageEvent = new MessageEvent('message', {
      data: 'login_success',
      source: popupWindow
    })
    act(() => {
      window.dispatchEvent(messageEvent)
    })

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/', { replace: true })
    })
  })

  test('popup should be closed when login is successful', async () => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn()
      }
    })
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn()
      }
    })
    window = Object.create(window)
    Object.defineProperty(window, 'opener', {
      value: { postMessage: jest.fn((message, origin) => {}) },
      writable: true
    })
    Object.defineProperty(window, 'close', {
      value: jest.fn(),
      writable: true
    })
    Object.defineProperty(window, 'location', {
      value: { href: 'http://fakedomain.com:8080', origin: '*' },
      writable: true
    })
    Object.defineProperty(window, 'history', {
      value: {},
      writable: true
    })

    render(
      <MemoryRouter initialEntries={['?nonce=123']}>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => expect(window.opener.postMessage).toHaveBeenCalledWith('login_success', '*'))
    await waitFor(() => expect(close).toBeCalled())
  })
})
