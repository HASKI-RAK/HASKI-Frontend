import { PrivacyPolicy } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('Test the PrivacyPolicy page', () => {
  it('renders PrivacyPolicy', () => {
    const { getByText } = render(<PrivacyPolicy />)
    expect(getByText('pages.PrivacyPolicy')).toBeTruthy()
  })

  it('renders the correct address details', () => {
    const { getByText, getAllByText } = render(<PrivacyPolicy />)
    expect(getByText('Jim Haug (HS Kempten)')).toBeTruthy()
    expect(getAllByText('Bahnhofstraße 61')).toBeTruthy()
    expect(getAllByText('D - 87435 Kempten')).toBeTruthy()
  })

  it('displays the correct Privacy Policy information', () => {
    const { getByText } = render(<PrivacyPolicy />)
    expect(getByText('1. pages.PrivacyPolicy.header.1')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.1.Text')).toBeTruthy()
    expect(getByText('2. pages.PrivacyPolicy.header.2')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.2.Text.1')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.2.Text.2')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.3')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.3.Text')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.4')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.4.Text')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.5')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.5.Text')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.1')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.2')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.3')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.4')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.5')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.6')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Paragraph.7')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Text.1')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Text.2')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Text.3')).toBeTruthy()
    expect(getByText('pages.PrivacyPolicy.header.6.Text.4')).toBeTruthy()
  })
})
