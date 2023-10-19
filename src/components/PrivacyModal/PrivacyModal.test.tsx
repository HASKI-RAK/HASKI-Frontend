import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import PrivacyModal from './PrivacyModal'
import { MemoryRouter } from 'react-router-dom'
import * as router from 'react-router'

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

  test('click the link', () => {
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    const link = form.getByRole('button', { name: /pages.PrivacyPolicy/i })
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
      name: /components.PrivacyModal.readPrivacypolicy pages.PrivacyPolicy/i
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

  test('Modal does not render if on url', () => {
    const form = render(
      <MemoryRouter initialEntries={['/privacypolicy']}>
        <PrivacyModal />
      </MemoryRouter>
    )
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })

  test('Modal does not render if cookie is set', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'privacy_accept_token = true'
    })
    const form = render(
      <MemoryRouter>
        <PrivacyModal />
      </MemoryRouter>
    )
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })
})
