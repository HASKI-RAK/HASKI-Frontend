import QuestionnaireListKQuestions from "./QuestionnaireListKQuestions";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {AuthContext} from "@services";
import renderer from "react-test-renderer";

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
}));


describe("Test ListK Questionnaire", () => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({status: 200}),
            status: 200,
            message: "OK",
        }),
    ) as jest.Mock


    test("ListK Questionnaire rendered", () => {

        const {getByTestId} = render(
            <MemoryRouter>
                <AuthContext.Provider value={{isAuth: false, setIsAuth: jest.fn(), logout: jest.fn()}}>
                    <QuestionnaireListKQuestions/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const RadioButtonGroup = getByTestId("ListKQuestionnaireButtonGroup1");
        expect(RadioButtonGroup).toBeInTheDocument;

    });

    test("renders correctly and matches snapshot", () => {
        const tree = renderer.create(<MemoryRouter>
            <AuthContext.Provider value={{isAuth: false, setIsAuth: jest.fn(), logout: jest.fn()}}>
                <QuestionnaireListKQuestions/>
            </AuthContext.Provider>
        </MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("ListK Questionnaire Skeleton loading", () => {

        const {container} = render(
            <MemoryRouter>
                <AuthContext.Provider value={{isAuth: true, setIsAuth: jest.fn(), logout: jest.fn()}}>
                    <QuestionnaireListKQuestions/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(container.innerHTML).toContain("MuiSkeleton-root");
    });
});