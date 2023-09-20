import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import PrivacyModal from './PrivacyModal'

describe('Test PrivacyModal', () => {
  const form = render(<PrivacyModal />)
  const declineButton = form.getByRole('button', { name: /Decline/i })
  test('accept the PrivacyPolicy', () => {
    const checkBox = form.getByRole('checkbox')
    const acceptButton = form.getByRole('button', { name: /Accept/i })
    fireEvent.click(checkBox)
    fireEvent.click(acceptButton)
    expect(form).not.toContain(acceptButton)
  })
  test('decline the PrivacyPolicy', () => {
    fireEvent.click(declineButton)
    expect(form).not.toContain(declineButton)
  })
  test('backdrop click', () => {
    fireEvent.click(window)
    expect(form).toContain(declineButton)
  })
})
