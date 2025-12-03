import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import LocalNavBar from './LocalNavBar'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: true,
      addListener: function () {},
      removeListener: function () {}
    }
  }

describe('[HASKI-REQ-0089] LocalNavBar tests', () => {
  it('should render LocalNav with isAuth false', async () => {
    await act(async () => {
      const result = render(
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter initialEntries={['/course/1/topic/1']}>
            <LocalNavBar />
          </MemoryRouter>
        </AuthContext.Provider>
      )

      expect(result).toBeTruthy()
    })
  })

  it('should render LocalNav with isAuth true', async () => {
    await act(async () => {
      const result = render(
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter initialEntries={['/course/1/topic/1']}>
            <LocalNavBar />
          </MemoryRouter>
        </AuthContext.Provider>
      )

      expect(result).toBeTruthy()
    })
  })

  it('should not render the drawer while the window has a small width', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const result = render(
      <MemoryRouter>
        <LocalNavBar />
      </MemoryRouter>
    )

    expect(result).toBeTruthy()
  })
})
