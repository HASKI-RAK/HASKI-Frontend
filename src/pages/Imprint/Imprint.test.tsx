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
    expect(getByText('components.Imprint.Title')).toBeTruthy()
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
    expect(getByText('components.Imprint.Disclaimer')).toBeTruthy()
    expect(getByText('1. ' + 'components.Imprint.Disclaimer.OnlineContent')).toBeTruthy()
    expect(getByText('components.Imprint.Disclaimer.OnlineContent.Text')).toBeTruthy()
    expect(getByText('2. ' + 'components.Imprint.Disclaimer.ReferencesAndLinks')).toBeTruthy()
    expect(getByText('components.Imprint.Disclaimer.ReferencesAndLinks.Text')).toBeTruthy()
    expect(getByText('3. ' + 'components.Imprint.Disclaimer.CopyrightAndTrademarkLaw')).toBeTruthy()
    expect(getByText('components.Imprint.Disclaimer.CopyrightAndTrademarkLaw.Text')).toBeTruthy()
    expect(getByText('4. ' + 'components.Imprint.Disclaimer.DataProtection')).toBeTruthy()
    expect(getByText('components.Imprint.Disclaimer.DataProtection.Text')).toBeTruthy()
    expect(getByText('5. ' + 'components.Imprint.Disclaimer.LegalValidityOfDisclaimer')).toBeTruthy()
    expect(getByText('components.Imprint.Disclaimer.LegalValidityOfDisclaimer.Text')).toBeTruthy()
  })

  it('displays the correct contact information for the authorised representative', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Imprint />
      </MemoryRouter>
    )
    expect(getByText('components.Imprint.AuthorisedRepresentative')).toBeTruthy()
    expect(getByText('components.Imprint.AuthorisedRepresentative.Title' + ' Prof. Dr. Georg Hagel')).toBeTruthy()
    expect(getByText('Tel.:')).toBeTruthy()
    expect(getByText('+49 (0) 831 2523-471')).toBeTruthy()
    expect(getByText('E-Mail:')).toBeTruthy()
    expect(getByText('georg.hagel@hs-kempten.de')).toBeTruthy()
  })
})
