import '@testing-library/jest-dom'
import { render, fireEvent, renderHook } from '@testing-library/react'
import PrivacyModal from './PrivacyModal'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { usePrivacyModal } from './PrivacyModal.hooks'
import { usePersistedStore } from '@store'

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
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
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
    expect(new_form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })

  test('decline the PrivacyPolicy', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    const declineButton = form.getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })

  test('Modal does not render if on privacypolicy page', () => {
    const form = render(
      <MemoryRouter initialEntries={['/privacypolicy']}>
        <PrivacyModal />
      </MemoryRouter>
    )
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })

  test('Modal does not render if cookie is set', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })

  //Tests for decline and redirect
  test('Redirects the user to TH-AB', async() => {
    mockServices.getUser.mockImplementationOnce(() =>
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
    const { fetchUser } = usePersistedStore.getState()
    const result = await fetchUser()
    const { getByRole } = render(<MemoryRouter><PrivacyModal/></MemoryRouter>)
    const declineButton = getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
    expect(await result.university).toBe('TH-AB')
  })

  test('Redirects the user to HS-KE', async() => {
    mockServices.getUser.mockImplementationOnce(() =>
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
    const { fetchUser } = usePersistedStore.getState()
    const result = await fetchUser()
    const { getByRole } = render(<MemoryRouter><PrivacyModal/></MemoryRouter>)
    const declineButton = getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
    fireEvent.click(declineButton)
    expect(await result.university).toBe('HS-KE')
  })
})

test('fetchUser throws error', async () => {
    mockServices.getUser = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('error')))
    const { result } = renderHook(() => usePrivacyModal(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })
    expect(await result.current.checkUniversity()).toBe('')
  })

test('decline ', async () => {
  mockServices.getUser = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('error')))
  const { result } = renderHook(() => usePrivacyModal(), {
    wrapper: ({ children }) => <MemoryRouter initialEntries={['/projectinformation']}>{children}</MemoryRouter>
  })
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/projectinformation']}>
      <PrivacyModal />
    </MemoryRouter>
  )
  const declineButton = getByRole('button', { name: /components.PrivacyModal.returnToMoodle/i })
  fireEvent.click(declineButton)
  expect(await result.current.checkUniversity()).toBe('')
})