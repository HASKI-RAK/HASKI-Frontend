import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import PrivacyModal from './PrivacyModal'

const mockCookie = jest.fn()
jest.mock('react-cookie', () => ({
  useCookies: () => [mockCookie, mockCookie]
}))

describe('Test PrivacyModal', () => {
  test('decline the PrivacyPolicy', () => {
    const form = render(<PrivacyModal />)
    const declineButton = form.getByRole('button', { name: /Decline/i })
    fireEvent.click(declineButton)
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })
  test('backdrop click', () => {
    const form = render(<PrivacyModal />)
    const backdrop = form.getByRole('presentation').children[0]
    fireEvent.click(backdrop)
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })
  test('accept the PrivacyPolicy', () => {
    const new_form = render(<PrivacyModal />)
    const checkBox = new_form.getByRole('checkbox', { name: /Agree Privacy Policy/i })
    fireEvent.click(checkBox)
    expect(checkBox).toBeChecked()
    const acceptButton = new_form.getByRole('button', { name: /Accept/i })
    expect(acceptButton).toHaveProperty('disabled', false)
    fireEvent.click(acceptButton)
    expect(new_form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })

  test('Modal does not render if on url', () => {
    window = Object.create(window)
    const url = 'http://localhost:8080/privacypolicy'
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      },
      writable: true // possibility to override
    })
    expect(window.location.href).toEqual(url)
    const form = render(<PrivacyModal />)
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })
  test('Modal does not render if cookie is set', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'privacy_accept_token = true'
    })
    const form = render(<PrivacyModal />)
    expect(form.queryByText('After reading please accept:')).not.toBeInTheDocument()
  })
})
