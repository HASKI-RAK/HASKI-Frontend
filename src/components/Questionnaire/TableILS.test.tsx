import "@testing-library/jest-dom";
import {ILS} from "./TableILS";
import {render} from "@testing-library/react";

//we have to mock react-i18next otherwise a warning will appear
//"You will need pass in an i18next instance by using initReactI18next" => mock is needed.

jest.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key:string) => key})
}));

// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src
describe("Test the Table dimensions", () => {

    test("interpretation is right", () => {

        const {getAllByRole} = render(<ILS/>);

        expect(getAllByRole("columnheader")[0]).toHaveTextContent("components.QuestionnaireResults.TableILS.Dimension");
        expect(getAllByRole("columnheader")[1]).toHaveTextContent("");
        expect(getAllByRole("columnheader")[2]).toHaveTextContent("components.QuestionnaireResults.TableILS.Interpretation");
        expect(getAllByRole("columnheader")[3]).toHaveTextContent("components.QuestionnaireResults.TableILS.Score");
        expect(getAllByRole("cell")[0]).toHaveTextContent("components.QuestionnaireResults.TableILS.Active");
        expect(getAllByRole("cell")[1]).toHaveTextContent("components.QuestionnaireResults.TableILS.Reflective");
        expect(getAllByRole("cell")[4]).toHaveTextContent("components.QuestionnaireResults.TableILS.Sensory");
        expect(getAllByRole("cell")[5]).toHaveTextContent("components.QuestionnaireResults.TableILS.Intuitive");
        expect(getAllByRole("cell")[8]).toHaveTextContent("components.QuestionnaireResults.TableILS.Visual");
        expect(getAllByRole("cell")[9]).toHaveTextContent("components.QuestionnaireResults.TableILS.Verbal");
        expect(getAllByRole("cell")[12]).toHaveTextContent("components.QuestionnaireResults.TableILS.Sequential");
        expect(getAllByRole("cell")[13]).toHaveTextContent("components.QuestionnaireResults.TableILS.Global");
    });
});

describe("Test Interpretation", () => {
    test("dimension interpretation is correct", () => {

        const {getAllByRole} = render(<ILS/>);

        expect(getAllByRole("cell")[2]).toHaveTextContent("components.QuestionnaireResults.TableILS.InterpretationActive");
        expect(getAllByRole("cell")[6]).toHaveTextContent("components.QuestionnaireResults.TableILS.InterpretationReflective");
        expect(getAllByRole("cell")[10]).toHaveTextContent("components.QuestionnaireResults.TableILS.InterpretationSensory");
        expect(getAllByRole("cell")[14]).toHaveTextContent("components.QuestionnaireResults.TableILS.InterpretationIntuitive");
    });
});

describe("Test the Table Score values are numbers", () => {

    test("values are numbers", () => {

        const {getAllByRole} = render(<ILS/>);

        const cell3 = getAllByRole("cell")[3].textContent;
        let cell3Int;
        if(cell3 !== null){
            cell3Int = parseInt(cell3)
        }

        const cell7 = getAllByRole("cell")[7].textContent;
        let cell7Int;
        if(cell7 !== null){
            cell7Int = parseInt(cell7)
        }

        const cell11 = getAllByRole("cell")[11].textContent;
        let cell11Int;
        if(cell11 !== null){
            cell11Int = parseInt(cell11)
        }

        const cell15 = getAllByRole("cell")[15].textContent;
        let cell15Int;
        if(cell15 !== null){
            cell15Int = parseInt(cell15)
        }

        expect(cell3Int).toBeGreaterThanOrEqual(-11);
        expect(cell7Int).toBeGreaterThanOrEqual(-11);
        expect(cell11Int).toBeGreaterThanOrEqual(-11);
        expect(cell15Int).toBeGreaterThanOrEqual(-11);
    });
});