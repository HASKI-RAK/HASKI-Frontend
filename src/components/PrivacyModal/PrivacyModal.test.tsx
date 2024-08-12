import '@testing-library/jest-dom'
import { fireEvent, render, renderHook } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import PrivacyModal from './PrivacyModal'
import { useUniversity } from '@common/hooks'

const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  document.cookie = 'privacy_accept_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
})

jest.mock('react-cookie', () => ({
  useCookies: () => [jest.fn(), jest.fn()]
}))

describe('Test PrivacyModal', () => {
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
    const declineButton = form.getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
  })

  test('Modal does not render if on privacypolicy page', () => {
    const form = render(
      <MemoryRouter initialEntries={['/privacypolicy']}>
        <PrivacyModal />
      </MemoryRouter>
    )
  })

  test('Modal does not render if cookie is set', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
  })

  //Tests for decline and redirect
  test('Redirects the user to TH-AB', async () => {
    mockServices.getUser = jest.fn().mockImplementation(() =>
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
    const university = useUniversity()

    const { getByRole } = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    expect(university).toBe('')
    const declineButton = getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
  })

  test('Redirects the user to HS-KE', async () => {
    mockServices.fetchUser = jest.fn().mockImplementation(() =>
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
    const { getByRole } = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    const declineButton = getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
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
    const declineButton = getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
  })
})
