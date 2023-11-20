import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Imprint } from '@pages'

describe('Imprint Component', () => {
  it('renders the component without errors', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Imprint />
      </MemoryRouter>
    )
    expect(getByText('pages.imprint.title')).toBeTruthy()
  })

  it('displays the correct address details', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Imprint />
      </MemoryRouter>
    )
    expect(getByText('Hochschule Kempten')).toBeTruthy()
    expect(getByText('Bahnhofstraße 61')).toBeTruthy()
    expect(getByText('D - 87435 Kempten')).toBeTruthy()
  })

  it('displays the correct disclaimer information', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Imprint />
      </MemoryRouter>
    )
    expect(getByText('pages.imprint.disclaimer')).toBeTruthy()
    expect(getByText('1. ' + 'pages.imprint.onlineContent')).toBeTruthy()
    expect(getByText('pages.imprint.onlineContentText')).toBeTruthy()
    expect(getByText('2. ' + 'pages.imprint.referenceLinks')).toBeTruthy()
    expect(getByText('pages.imprint.referenceLinksText')).toBeTruthy()
    expect(getByText('3. ' + 'pages.imprint.copyrightAndTrademarkLaw')).toBeTruthy()
    expect(getByText('pages.imprint.copyrightAndTrademarkLawText')).toBeTruthy()
    expect(getByText('4. ' + 'pages.imprint.dataProtection')).toBeTruthy()
    expect(getByText('pages.imprint.dataProtectionText')).toBeTruthy()
    expect(getByText('5. ' + 'pages.imprint.legalValidity')).toBeTruthy()
    expect(getByText('pages.imprint.legalValidityText')).toBeTruthy()
  })

  it('displays the correct contact information for the authorised representative', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Imprint />
      </MemoryRouter>
    )
    expect(getByText('pages.imprint.authorisedRepresentative')).toBeTruthy()
    expect(getByText('pages.imprint.authorisedRepresentativeTitle' + ' Prof. Dr. Georg Hagel')).toBeTruthy()
    expect(getByText('Tel.:')).toBeTruthy()
    expect(getByText('+49 (0) 831 2523-471')).toBeTruthy()
    expect(getByText('E-Mail:')).toBeTruthy()
    expect(getByText('georg.hagel@hs-kempten.de')).toBeTruthy()
  })
})
