import { render } from '@testing-library/react'
import { ImprintContent } from '@components'

describe('ImprintContent Component', () => {
    it('renders the component without errors', () => {
        const { getByText } = render(<ImprintContent />)
        expect(getByText("components.ImprintContent.Title")).toBeTruthy()
    })

    it('displays the correct address details', () => {
        const { getByText } = render(<ImprintContent />)
        expect(getByText('Hochschule Kempten')).toBeTruthy()
        expect(getByText('Bahnhofstraße 61')).toBeTruthy()
        expect(getByText('D - 87435 Kempten')).toBeTruthy()
    })

    it('displays the correct disclaimer information', () => {
        const { getByText } = render(<ImprintContent />);
        expect(getByText("components.ImprintContent.Disclaimer")).toBeTruthy()
        expect(getByText("1. " + "components.ImprintContent.Disclaimer.OnlineContent")).toBeTruthy()
        expect(getByText("components.ImprintContent.Disclaimer.OnlineContent.Text")).toBeTruthy()
        expect(getByText("2. " + "components.ImprintContent.Disclaimer.ReferencesAndLinks")).toBeTruthy()
        expect(getByText("components.ImprintContent.Disclaimer.ReferencesAndLinks.Text")).toBeTruthy()
        expect(getByText("3. " + "components.ImprintContent.Disclaimer.CopyrightAndTrademarkLaw")).toBeTruthy()
        expect(getByText("components.ImprintContent.Disclaimer.CopyrightAndTrademarkLaw.Text")).toBeTruthy()
        expect(getByText("4. " + "components.ImprintContent.Disclaimer.DataProtection")).toBeTruthy()
        expect(getByText("components.ImprintContent.Disclaimer.DataProtection.Text")).toBeTruthy()
        expect(getByText("5. " + "components.ImprintContent.Disclaimer.LegalValidityOfDisclaimer")).toBeTruthy()
        expect(getByText("components.ImprintContent.Disclaimer.LegalValidityOfDisclaimer.Text")).toBeTruthy()
    });

    it('displays the correct contact information for the authorised representative', () => {
        const { getByText } = render(<ImprintContent />)
        expect(getByText("components.ImprintContent.AuthorisedRepresentative")).toBeTruthy();
        expect(getByText( "components.ImprintContent.AuthorisedRepresentative.Title" + " Prof. Dr. Georg Hagel")).toBeTruthy()
        expect(getByText('Tel.:')).toBeTruthy()
        expect(getByText('+49 (0) 831 2523-471')).toBeTruthy()
        expect(getByText('E-Mail:')).toBeTruthy()
        expect(getByText('georg.hagel@hs-kempten.de')).toBeTruthy()
    })
})
