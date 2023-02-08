import "@testing-library/jest-dom";
import {TableILS, getInterpretation, GetILSParameters, getILSDimension} from "./TableILS";
import {render} from "@testing-library/react";
import React from "react";

//we have to mock react-i18next otherwise a warning will appear
//"You will need pass in an i18next instance by using initReactI18next" => mock is needed.

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                //changeLanguage: () => new Promise(() => {}),
                getFixedT: () => (str: string) => { return str; },
                // You can include here any property your component may use
            },
        }
    },
}))

describe("Test TableILS with all Methods", () => {

    test("ILS parameters are plausible",
        () => {

        const ILSParameters = GetILSParameters();

        expect(ILSParameters.length).toBe(4);
        expect(ILSParameters[0] > -12 && ILSParameters[0] < 12).toBe(true);
        expect(ILSParameters[1] > -12 && ILSParameters[1] < 12).toBe(true);
        expect(ILSParameters[2] > -12 && ILSParameters[2] < 12).toBe(true);
        expect(ILSParameters[3] > -12 && ILSParameters[3] < 12).toBe(true);
        });


    test("Table values are correct",
        () => {

            const {getAllByRole} = render(<TableILS/>);

            expect(getAllByRole("columnheader")[0]).toHaveTextContent("components.QuestionnaireResults.TableILS.Dimension");
            expect(getAllByRole("columnheader")[1]).toHaveTextContent("");
            expect(getAllByRole("columnheader")[2]).toHaveTextContent("components.QuestionnaireResults.TableILS.Interpretation");
            expect(getAllByRole("columnheader")[3]).toHaveTextContent("components.QuestionnaireResults.TableILS.Score");
            expect(getAllByRole("cell")[1]).toHaveTextContent("components.QuestionnaireResults.TableILS.Active");
            expect(getAllByRole("cell")[0]).toHaveTextContent("components.QuestionnaireResults.TableILS.Reflective");
            expect(getAllByRole("cell")[5]).toHaveTextContent("components.QuestionnaireResults.TableILS.Sensory");
            expect(getAllByRole("cell")[4]).toHaveTextContent("components.QuestionnaireResults.TableILS.Intuitive");
            expect(getAllByRole("cell")[9]).toHaveTextContent("components.QuestionnaireResults.TableILS.Visual");
            expect(getAllByRole("cell")[8]).toHaveTextContent("components.QuestionnaireResults.TableILS.Verbal");
            expect(getAllByRole("cell")[13]).toHaveTextContent("components.QuestionnaireResults.TableILS.Sequential");
            expect(getAllByRole("cell")[12]).toHaveTextContent("components.QuestionnaireResults.TableILS.Global");
        });

    test("Dimension interpretation is correct",
        () => {

            expect(getInterpretation(-1, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(1, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(-3, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(3, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(-5, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(5, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(-7, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(7, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(-9, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(9, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(-11, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(11, "components.QuestionnaireResults.TableILS.Reflective")).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");

            expect(getInterpretation(-1, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(1, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(-3, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(3, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.balanced");
            expect(getInterpretation(-5, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(5, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(-7, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(7, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.moderate components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(-9, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(9, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(-11, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
            expect(getInterpretation(11, "components.QuestionnaireResults.TableILS.Reflective",true)).toBe("components.QuestionnaireResults.TableILS.strong components.QuestionnaireResults.TableILS.Reflective");
        });


    test("Returned dimensions are correct",
        () => {

            expect(getILSDimension(1,3)).toBe("components.QuestionnaireResults.TableILS.Active");
            expect(getILSDimension(1,-3)).toBe("components.QuestionnaireResults.TableILS.Reflective");
            expect(getILSDimension(2,3)).toBe("components.QuestionnaireResults.TableILS.Sensory");
            expect(getILSDimension(2,-3)).toBe("components.QuestionnaireResults.TableILS.Intuitive");
            expect(getILSDimension(3,3)).toBe("components.QuestionnaireResults.TableILS.Visual");
            expect(getILSDimension(3,-3)).toBe("components.QuestionnaireResults.TableILS.Verbal");
            expect(getILSDimension(4,3)).toBe("components.QuestionnaireResults.TableILS.Sequential");
            expect(getILSDimension(4,-3)).toBe("components.QuestionnaireResults.TableILS.Global");

            expect(getILSDimension(1,3, true)).toBe("components.QuestionnaireResults.TableILS.Active");
            expect(getILSDimension(1,-3, true)).toBe("components.QuestionnaireResults.TableILS.Reflective");
            expect(getILSDimension(2,3, true)).toBe("components.QuestionnaireResults.TableILS.Sensory");
            expect(getILSDimension(2,-3, true)).toBe("components.QuestionnaireResults.TableILS.Intuitive");
            expect(getILSDimension(3,3, true)).toBe("components.QuestionnaireResults.TableILS.Visual");
            expect(getILSDimension(3,-3, true)).toBe("components.QuestionnaireResults.TableILS.Verbal");
            expect(getILSDimension(4,3, true)).toBe("components.QuestionnaireResults.TableILS.Sequential");
            expect(getILSDimension(4,-3, true)).toBe("components.QuestionnaireResults.TableILS.Global");

            expect(getILSDimension(100, 3)).toBe("No dimension found");
            expect(getILSDimension(100, 3,true)).toBe("No dimension found");
        });

    test("Table Score-values are numbers",
        () => {

            const {getAllByRole} = render(<TableILS/>);

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

// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src