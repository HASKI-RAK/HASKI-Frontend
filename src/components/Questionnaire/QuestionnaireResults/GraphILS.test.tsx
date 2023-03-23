import "@testing-library/jest-dom";
import {useData, GraphILS} from "./GraphILS";
import {render} from "@testing-library/react";
import React from "react";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
        }
    },
}))

describe("Test GraphILS with all Methods",
    () => {
    test("Required data is returned in correct format", () => {

        const data = useData();

        expect(data.length).toBe(4);

        expect(data[0].possibleDimensions).toMatch(("components.Questionnaire.QuestionnaireResults.TableILS.Global") + " / " + ("components.Questionnaire.QuestionnaireResults.TableILS.Sequential"));
        expect(data[1].possibleDimensions).toMatch(("components.Questionnaire.QuestionnaireResults.TableILS.Verbal") + " / " + ("components.Questionnaire.QuestionnaireResults.TableILS.Visual"))
        expect(data[2].possibleDimensions).toMatch(("components.Questionnaire.QuestionnaireResults.TableILS.Intuitive") + " / " + ("components.Questionnaire.QuestionnaireResults.TableILS.Sensory"))
        expect(data[3].possibleDimensions).toMatch(("components.Questionnaire.QuestionnaireResults.TableILS.Reflective") + " / " + ("components.Questionnaire.QuestionnaireResults.TableILS.Active"))

    });

    test("GraphILS renders without crashing", () => {
        const graphILS = render(
                <GraphILS />
        );

        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Active")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Reflective")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Sensory")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Intuitive")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Visual")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Verbal")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Sequential")).toBeInTheDocument();
        expect(graphILS.getByText("components.Questionnaire.QuestionnaireResults.TableILS.Global")).toBeInTheDocument();

        expect(graphILS).toMatchSnapshot();
    });

});