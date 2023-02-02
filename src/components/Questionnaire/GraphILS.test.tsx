import "@testing-library/jest-dom";
import {SetData, GraphILS} from "./GraphILS";
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

        const data = SetData();

        expect(data.length).toBe(4);

        expect(data[0].possibleDimensions).toMatch(("components.QuestionnaireResults.TableILS.Global") + " / " + ("components.QuestionnaireResults.TableILS.Sequential"));
        expect(data[1].possibleDimensions).toMatch(("components.QuestionnaireResults.TableILS.Verbal") + " / " + ("components.QuestionnaireResults.TableILS.Visual"))
        expect(data[2].possibleDimensions).toMatch(("components.QuestionnaireResults.TableILS.Intuitive") + " / " + ("components.QuestionnaireResults.TableILS.Sensory"))
        expect(data[3].possibleDimensions).toMatch(("components.QuestionnaireResults.TableILS.Reflective") + " / " + ("components.QuestionnaireResults.TableILS.Active"))

    });

    test("GraphILS renders without crashing", () => {
        const graphILS = render(
                <GraphILS />
        );

        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Active")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Reflective")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Sensory")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Intuitive")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Visual")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Verbal")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Sequential")).toBeInTheDocument();
        expect(graphILS.getByText("components.QuestionnaireResults.TableILS.Global")).toBeInTheDocument();

        expect(graphILS).toMatchSnapshot();
    });

});