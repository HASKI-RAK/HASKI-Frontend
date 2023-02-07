import "@testing-library/jest-dom";
import {ResultDescriptionILS} from "./ResultDescriptionILS";
import {setILSParameters,getInterpretation, getILSDimension} from "./TableILS";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate-hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => {
                if(str==='components.QuestionnaireResults.TableILS.balanced') return 'balanced'
                else return str.substring(41,str.length); },
            i18n: {
                //changeLanguage: () => new Promise(() => {}),
                getFixedT: () => (str: string) => {
                    if(str==='components.QuestionnaireResults.TableILS.balanced') return 'balanced'
                    else return str.substring(41,str.length); },
                // You can include here any property your component may use
            },
        }
    },
}))

describe("Test ResultDescriptionILS with all Score combinations",() => {

    test("all dimensions are balanced", () => {

        const dimScoreArray = [3, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].props.children.substring(12, container.props.children[1].props.children.length)).toBe("EverythingBalanced");

    });

    test("active is balanced (others do not matter)", () => {

        const dimScoreArray = [1, 9, 7, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is active & moderate", () => {

        const dimScoreArray = [5, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 1;

        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is active & strong", () => {

        const dimScoreArray = [9, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("reflective and balanced (other do not matter)", () => {

        const dimScoreArray = [-3, 7, 9, 7];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is reflective & moderate", () => {

        const dimScoreArray = [-5, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is reflective & strong", () => {

        const dimScoreArray = [-9, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("sensory is balanced (others do not matter)", () => {

        const dimScoreArray = [5, 3, 7, 11];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is sensory & moderate", () => {

        const dimScoreArray = [3, 5, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 2;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is sensory & strong", () => {

        const dimScoreArray = [3, 9, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 2;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("intuitive is balanced (others do not matter)", () => {

        const dimScoreArray = [9, -3, 9, 7];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is intuitive & moderate", () => {

        const dimScoreArray = [3, -5, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 2;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is intuitive & strong", () => {

        const dimScoreArray = [3, -11, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 2;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("visual is balanced (others do not matter)", () => {

        const dimScoreArray = [7, 9, 3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is visual & moderate", () => {

        const dimScoreArray = [3, 3, 5, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 3;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is visual & strong", () => {

        const dimScoreArray = [3, 3, 9, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 3;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("verbal is balanced (others do not matter)", () => {

        const dimScoreArray = [11, 7, -3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is verbal & moderate", () => {

        const dimScoreArray = [3, 3, -5, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 3;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is verbal & strong", () => {

        const dimScoreArray = [3, 3, -9, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 3;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("sequential is balanced (others do not matter)", () => {

        const dimScoreArray = [-7, 7, 7, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is sequential & moderate", () => {

        const dimScoreArray = [3, 3, 3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 4;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is sequential & strong", () => {

        const dimScoreArray = [3, 3, 3, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 4;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("global is balanced (others do not matter)", () => {

        const dimScoreArray = [-11, 9, 9, -3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();

        expect(container.props.children[1].key).toBe("InnerDivResultDescriptionILS");
    });

    test("3 dimensions are balanced, 1 Dimension is global & moderate", () => {

        const dimScoreArray = [3, 3, 3, -5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 4;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("3 dimensions are balanced, 1 Dimension is global & strong", () => {

        const dimScoreArray = [3, 3, 3, -9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let unbalancedDimension = 4;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(unbalancedDimension, dimScoreArray[unbalancedDimension - 1]);
            const int = getInterpretation(dimScoreArray[unbalancedDimension - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            unbalancedDimension++;
        });
    });

    test("all dimensions moderate positive", () => {

        const dimScoreArray = [5, 5, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let i = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(i, dimScoreArray[i - 1]);
            const int = getInterpretation(dimScoreArray[i - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            i++;
        });
    });

    test("all dimensions strong positive", () => {

        const dimScoreArray = [9, 9, 9, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let i = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(i, dimScoreArray[i - 1]);
            const int = getInterpretation(dimScoreArray[i - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            i++;
        });
    });

    test("all dimensions moderate negative", () => {

        const dimScoreArray = [-5, -5, -5, -5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let i = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(i, dimScoreArray[i - 1]);
            const int = getInterpretation(dimScoreArray[i - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            i++;
        });
    });

    test("all dimensions strong negative", () => {

        const dimScoreArray = [-9, -9, -9, -9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const container = ResultDescriptionILS();
        let i = 1;


        container.props.children[0].forEach((element: { key: string }) => {
            const dim = getILSDimension(i, dimScoreArray[i - 1]);
            const int = getInterpretation(dimScoreArray[i - 1], "").trim();

            expect(element.key).toBe("Dimension: " + dim + " Interpretation: " + int);
            i++;
        });
    });

    test("all dimensions balanced", () => {

        const dimScoreArray = [3, 3, 3, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const getILSDimension = jest.fn().mockImplementation((dim: number, score: number, something?: boolean) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return (dim: number, score: number, something?: boolean) => "test";
        });

        const container = ResultDescriptionILS(getILSDimension(1, 1, true));
        //Because the Switch is not working in the test, the following String has 2 spaces at the end
        expect(container.props.children[1].props.children[1].props.children.substring(98,105)).toMatch("Part2  ")

    });

});