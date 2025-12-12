import '@testing-library/jest-dom'
import { act, fireEvent, render } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import PrivacyModal from './PrivacyModal'

const navigate = jest.fn()

Object.defineProperty(window, 'location', {
  value: { assign: jest.fn() }
})

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  document.cookie = 'privacy_accept_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
})

jest.mock('react-cookie', () => ({
  useCookies: () => [jest.fn(), jest.fn()]
}))

describe('[HASKI-REQ-0001] Test PrivacyModal', () => {
  test('backdrop click', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    const backdrop = form.getByRole('presentation').children[0]
    fireEvent.click(backdrop)
  })

  test('click the link to privacypolicy', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    const link = form.getByRole('button', { name: /pages.privacypolicy/i })
    fireEvent.click(link)
    expect(navigate).toHaveBeenCalledWith('/privacypolicy')
  })

  test('accept the PrivacyPolicy', () => {
    const new_form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    const checkBox = new_form.getByRole('checkbox', {
      name: /components.PrivacyModal.readPrivacypolicy pages.privacypolicy/i
    })
    fireEvent.click(checkBox)
    expect(checkBox).toBeChecked()
    const acceptButton = new_form.getByRole('button', { name: /Accept/i })
    expect(acceptButton).toHaveProperty('disabled', false)
    fireEvent.click(acceptButton)
  })

  test('decline the PrivacyPolicy', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    act(() => {
      const declineButton = form.getByRole('button', { name: /appGlobal.decline/i })
      fireEvent.click(declineButton)
    })
  })

  test('Modal does not render if on privacypolicy page', () => {
    render(
      <MemoryRouter initialEntries={['/privacypolicy']}>
        <PrivacyModal />
      </MemoryRouter>
    )
  })

  //Tests for decline and redirect
  test('Redirects the user to TH-AB', async () => {
    mockServices.fetchUser.mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    const { getByRole, rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <PrivacyModal />
      </MemoryRouter>
    )
    await new Promise(process.nextTick)
    rerender(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    act(() => {
      const declineButton = getByRole('button', { name: /appGlobal.decline/i })
      expect(declineButton).toBeInTheDocument()
      fireEvent.click(declineButton)
    })
    expect(window.location.assign).toHaveBeenCalled()
    expect(window.location.assign).toHaveBeenCalledWith('https://moodle.th-ab.de/')
  })

  test('Redirects the user to HS-KE', async () => {
    mockServices.fetchUser.mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'HS-KE'
      })
    )
    const { getByRole, rerender } = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    await new Promise(process.nextTick)

    rerender(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )

    act(() => {
      const declineButton = getByRole('button', { name: /appGlobal.decline/i })
      fireEvent.click(declineButton)
    })
    expect(window.location.assign).toHaveBeenCalled()
    expect(window.location.assign).toHaveBeenCalledWith('https://moodle.hs-kempten.de/')
  })

  test('decline returns the user two pages prior', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: ''
      })
    )
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/login']}>
        <PrivacyModal />
      </MemoryRouter>
    )
    act(() => {
      const declineButton = getByRole('button', { name: /appGlobal.decline/i })
      fireEvent.click(declineButton)
    })
  })
})

test('Modal does not render if cookie is set', () => {
  render(
    <MemoryRouter>
      <PrivacyModal />
    </MemoryRouter>
  )
})
