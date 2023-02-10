import "@testing-library/jest-dom";
import {QuestionnaireResultsModal} from "./QuestionnaireResultsModal";
import {fireEvent, render} from "@testing-library/react";
import * as React from 'react';


jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                //changeLanguage: () => new Promise(() => {}),
                getFixedT: () => (str: string) => {
                    if(str === 'components.QuestionnaireResults.TableILS.balanced') return 'balanced'
                    else return str;
                },
                // You can include here any property your component may use
            },
        }
    },
}))


describe("Test ResultDescriptionListK with all Methods", () => {


    test("Modal opens", async() => {

        const {getByTestId} = render(<QuestionnaireResultsModal/>);

        expect(getByTestId("QuestionnaireResultsButton")).toBeInTheDocument();
    });

    test("Active Step ILS is shown", async() => {

        const {getByTestId} = render(<QuestionnaireResultsModal/>);

        fireEvent.click(getByTestId('QuestionnaireResultsButton'));
        expect(getByTestId("ActiveStepILS")).toBeInTheDocument();
    });

    test("Active Step List-K is shown", async() => {

        const {getByTestId} = render(<QuestionnaireResultsModal/>);

        fireEvent.click(getByTestId('QuestionnaireResultsButton'));
        fireEvent.click(getByTestId('nextButton'));
        expect(getByTestId("ActiveStepListK")).toBeInTheDocument();
    });

    test("Active Step List-K is shown", async() => {

        const {getByTestId, getByText} = render(<QuestionnaireResultsModal/>);

        fireEvent.click(getByTestId('QuestionnaireResultsButton'));
        fireEvent.click(getByText('components.QuestionnaireResults.ResultDescriptionILS.ILSResults'));
        expect(getByTestId("ActiveStepILS")).toBeInTheDocument();
    });

    test("Active Step List-K is shown", async() => {

        const {getByTestId, getByText} = render(<QuestionnaireResultsModal/>);

        fireEvent.click(getByTestId('QuestionnaireResultsButton'));
        fireEvent.click(getByText('components.QuestionnaireResults.ResultDescriptionILS.ListKResults'));
        expect(getByTestId("ActiveStepListK")).toBeInTheDocument();
    });

    test("Next and Back button work", async() => {

        const {getByTestId} = render(<QuestionnaireResultsModal/>);

        fireEvent.click(getByTestId('QuestionnaireResultsButton'));
        fireEvent.click(getByTestId('nextButton'));
        expect(getByTestId("ActiveStepListK")).toBeInTheDocument();
        //cant click twice
        fireEvent.click(getByTestId('nextButton'));
        expect(getByTestId("ActiveStepListK")).toBeInTheDocument();


        fireEvent.click(getByTestId('backButton'));
        expect(getByTestId("ActiveStepILS")).toBeInTheDocument();
        //cant click twice
        fireEvent.click(getByTestId('backButton'));
        expect(getByTestId("ActiveStepILS")).toBeInTheDocument();
    });

    test("close button works", async() => {

        const {getByTestId} = render(<QuestionnaireResultsModal/>);

        fireEvent.click(getByTestId('QuestionnaireResultsButton'));
        expect(getByTestId("ActiveStepILS")).toBeInTheDocument();
        fireEvent.click(getByTestId('QuestionnaireResultsCloseButton'));
        expect(getByTestId("QuestionnaireResultsButton")).toBeInTheDocument();
    });

});