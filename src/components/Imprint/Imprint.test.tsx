import React from 'react';
import { render } from '@testing-library/react';
import { Imprint } from './Imprint';

describe('Imprint Component', () => {
    it('renders the component without errors', () => {
        const { getByText } = render(<Imprint />);
        expect(getByText("components.Imprint.Imprint")).toBeTruthy();
    });

    it('displays the correct address details', () => {
        const { getByText } = render(<Imprint />);
        expect(getByText('Hochschule Kempten')).toBeTruthy();
        expect(getByText('Bahnhofstraße 61')).toBeTruthy();
        expect(getByText('D - 87435 Kempten')).toBeTruthy();
    });

    it('displays the correct disclaimer information', () => {
        const { getByText } = render(<Imprint />);
        expect(getByText("components.Imprint.Imprint.Disclaimer")).toBeTruthy();
        expect(getByText("1. " + "components.Imprint.Imprint.Disclaimer.OnlineContent")).toBeTruthy();
        expect(getByText("components.Imprint.Imprint.Disclaimer.OnlineContent.Text")).toBeTruthy();
        expect(getByText("2. " + "components.Imprint.Imprint.Disclaimer.ReferencesAndLinks")).toBeTruthy();
        expect(getByText("components.Imprint.Imprint.Disclaimer.ReferencesAndLinks.Text")).toBeTruthy();
        expect(getByText("3. " + "components.Imprint.Imprint.Disclaimer.CopyrightAndTrademarkLaw")).toBeTruthy();
        expect(getByText("components.Imprint.Imprint.Disclaimer.CopyrightAndTrademarkLaw.Text"))
        expect(getByText("4. " + "components.Imprint.Imprint.Disclaimer.DataProtection")).toBeTruthy();
        expect(getByText("components.Imprint.Imprint.Disclaimer.DataProtection.Text")).toBeTruthy();
        expect(getByText("5. " + "components.Imprint.Imprint.Disclaimer.LegalValidityOfDisclaimer")).toBeTruthy();
        expect(getByText("components.Imprint.Imprint.Disclaimer.LegalValidityOfDisclaimer.Text")).toBeTruthy();
    });

    it('displays the correct contact information for the authorised representative', () => {
        const { getByText } = render(<Imprint />);
        expect(getByText("components.Imprint.Imprint.AuthorisedRepresentative")).toBeTruthy();
        expect(getByText( "components.Imprint.Imprint.AuthorisedRepresentative.Title" + " Prof. Dr. Georg Hagel")).toBeTruthy();
        expect(getByText('Tel.:')).toBeTruthy();
        expect(getByText('+49 (0) 831 2523-471')).toBeTruthy();
        expect(getByText('E-Mail:')).toBeTruthy();
        expect(getByText('georg.hagel@hs-kempten.de')).toBeTruthy();
    });
});
