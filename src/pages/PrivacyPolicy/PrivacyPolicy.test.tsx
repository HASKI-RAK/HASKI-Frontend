import { PrivacyPolicy } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Test the PrivacyPolicy page', () => {
  it('renders PrivacyPolicy', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    )
    expect(getByText('pages.privacypolicy')).toBeTruthy()
  })

  it('renders the correct address details', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    )
    expect(getByText('Jim Haug (HS Kempten)')).toBeTruthy()
    expect(getAllByText('Bahnhofstraße 61')).toBeTruthy()
    expect(getAllByText('D - 87435 Kempten')).toBeTruthy()
  })

  it('displays the correct Privacy Policy information', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    )
    expect(getByText('1. pages.privacypolicy.header.1')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.1.text')).toBeTruthy()
    expect(getByText('2. pages.privacypolicy.header.2')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.2.text.1')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.2.text.2')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.3')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.3.text')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.4')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.4.text')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.5')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.5.text')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.1')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.2')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.3')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.4')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.5')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.6')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.paragraph.7')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.text.1')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.text.2')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.text.3')).toBeTruthy()
    expect(getByText('pages.privacypolicy.header.6.text.4')).toBeTruthy()
  })
})
