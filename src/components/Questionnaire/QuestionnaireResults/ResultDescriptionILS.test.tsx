import "@testing-library/jest-dom";
import {ResultDescriptionILS} from "@components";
import {setILSParameters, ILSDimension} from "./TableILS";
import {render} from "@testing-library/react";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate-hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => {
                if(str==='components.Questionnaire.QuestionnaireResults.TableILS.balanced') return 'balanced'
                else return str.substring(55,str.length); },
            i18n: {
                //changeLanguage: () => new Promise(() => {}),
                getFixedT: () => (str: string) => {
                    if(str==='components.Questionnaire.QuestionnaireResults.TableILS.balanced') return 'balanced'
                    else return str.substring(55,str.length); },
                // You can include here any property your component may use
            },
        }
    },
}))

describe("Test ResultDescriptionILS with all Score combinations",() => {

    test("all positive dimensions are balanced", () => {

        const dimScoreArray = [3, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const { container } = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(251,(251+"EverythingBalanced".length))).toBe("EverythingBalanced");
    });

    test("all negative dimensions are balanced", () => {

        const dimScoreArray = [-3, -3, -3, -3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const { container } = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(251,(251+"EverythingBal".length))).toBe("EverythingBal");

    });

    test("3 dimensions are balanced, 1 Dimension is active & moderate", () => {

        const dimScoreArray = [5, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Active Interpretation: moderate".length))).toBe("Dimension: Active Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is active & strong", () => {

        const dimScoreArray = [9, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )


        expect(container.innerHTML.substring(23,(23+"Dimension: Active Interpretation: strong".length))).toBe("Dimension: Active Interpretation: strong");
    });

    test("3 dimensions are balanced, 1 Dimension is reflective & moderate", () => {

        const dimScoreArray = [-5, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Reflective Interpretation: moderate".length))).toBe("Dimension: Reflective Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is reflective & strong", () => {

        const dimScoreArray = [-9, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Reflective Interpretation: strong".length))).toBe("Dimension: Reflective Interpretation: strong");
    });

    test("3 dimensions do not matter, 1 Dimension is reflective & balanced", () => {

        const dimScoreArray = [-3, 5, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1374,(1374+"SomethingBalanced.processing".length))).toBe("SomethingBalanced.processing");
    });

    test("3 dimensions are balanced, 1 Dimension is sensory & moderate", () => {

        const dimScoreArray = [3, 5, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Sensory Interpretation: moderate".length))).toBe("Dimension: Sensory Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is sensory & strong", () => {

        const dimScoreArray = [3, 9, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Sensory Interpretation: strong".length))).toBe("Dimension: Sensory Interpretation: strong");
    });

    test("3 dimensions are balanced, 1 Dimension is intuitive & moderate", () => {

        const dimScoreArray = [3, -5, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Intuitive Interpretation: moderate".length))).toBe("Dimension: Intuitive Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is intuitive & strong", () => {

        const dimScoreArray = [3, -11, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Intuitive Interpretation: strong".length))).toBe("Dimension: Intuitive Interpretation: strong");
    });

    test("3 dimensions do not matter, 1 Dimension is intuitive & balanced", () => {

        const dimScoreArray = [5, -3, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1371,(1371+"SomethingBalanced.perception".length))).toBe("SomethingBalanced.perception");
    });

    test("3 dimensions are balanced, 1 Dimension is visual & moderate", () => {

        const dimScoreArray = [3, 3, 5, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Visual Interpretation: moderate".length))).toBe("Dimension: Visual Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is visual & strong", () => {

        const dimScoreArray = [3, 3, 9, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Visual Interpretation: strong".length))).toBe("Dimension: Visual Interpretation: strong");
    });

    test("3 dimensions are balanced, 1 Dimension is verbal & moderate", () => {

        const dimScoreArray = [3, 3, -5, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Verbal Interpretation: moderate".length))).toBe("Dimension: Verbal Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is verbal & strong", () => {

        const dimScoreArray = [3, 3, -9, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Verbal Interpretation: strong".length))).toBe("Dimension: Verbal Interpretation: strong");
    });

    test("3 dimensions do not matter, 1 Dimension is verbal & balanced", () => {

        const dimScoreArray = [5, 5, -3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1374,(1374+"SomethingBalanced.presentation".length))).toBe("SomethingBalanced.presentation");
    });

    test("3 dimensions are balanced, 1 Dimension is sequential & moderate", () => {

        const dimScoreArray = [3, 3, 3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Sequential Interpretation: moderate".length))).toBe("Dimension: Sequential Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is sequential & strong", () => {

        const dimScoreArray = [3, 3, 3, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Sequential Interpretation: strong".length))).toBe("Dimension: Sequential Interpretation: strong");
    });

    test("3 dimensions are balanced, 1 Dimension is global & moderate", () => {

        const dimScoreArray = [3, 3, 3, -5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Global Interpretation: moderate".length))).toBe("Dimension: Global Interpretation: moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is global & strong", () => {

        const dimScoreArray = [3, 3, 3, -9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Global Interpretation: strong".length))).toBe("Dimension: Global Interpretation: strong");
    });

    test("3 dimensions do not matter, 1 Dimension is global & balanced", () => {

        const dimScoreArray = [5, 5, 5, -3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1362,(1362+"SomethingBalanced.organisation".length))).toBe("SomethingBalanced.organisation");
    });

    test("all dimensions moderate positive", () => {

        const dimScoreArray = [5, 5, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )


        expect(container.innerHTML.substring(23,(23+"Dimension: Active Interpretation: moderate".length))).toBe("Dimension: Active Interpretation: moderate");
        expect(container.innerHTML.substring(351,(351+"Dimension: Sensory Interpretation: moderate".length))).toBe("Dimension: Sensory Interpretation: moderate");
        expect(container.innerHTML.substring(682,(682+"Dimension: Visual Interpretation: moderate".length))).toBe("Dimension: Visual Interpretation: moderate");
        expect(container.innerHTML.substring(1010,(1010+"Dimension: Sequential Interpretation: moderate".length))).toBe("Dimension: Sequential Interpretation: moderate");
    });

    test("all dimensions strong positive", () => {

        const dimScoreArray = [9, 9, 9, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(347,(347+"Dimension: Sensory Interpretation: strong".length))).toBe("Dimension: Sensory Interpretation: strong");
        expect(container.innerHTML.substring(23,(23+"Dimension: Active Interpretation: strong".length))).toBe("Dimension: Active Interpretation: strong");
        expect(container.innerHTML.substring(674,(674+"Dimension: Visual Interpretation: strong".length))).toBe("Dimension: Visual Interpretation: strong");
        expect(container.innerHTML.substring(998,(998+"Dimension: Sequential Interpretation: strong".length))).toBe("Dimension: Sequential Interpretation: strong");
    });

    test("all dimensions moderate negative", () => {

        const dimScoreArray = [-5, -5, -5, -5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(23,(23+"Dimension: Reflective Interpretation: moderate".length))).toBe("Dimension: Reflective Interpretation: moderate");
        expect(container.innerHTML.substring(363,(363+"Dimension: Intuitive Interpretation: moderate".length))).toBe("Dimension: Intuitive Interpretation: moderate");
        expect(container.innerHTML.substring(700,(700+"Dimension: Verbal Interpretation: moderate".length))).toBe("Dimension: Verbal Interpretation: moderate");
        expect(container.innerHTML.substring(1028,(1028+"Dimension: Global Interpretation: moderate".length))).toBe("Dimension: Global Interpretation: moderate");
    });

    test("all dimensions strong negative", () => {

        const dimScoreArray = [-9, -9, -9, -9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(359,(359+"Dimension: Intuitive Interpretation: strong".length))).toBe("Dimension: Intuitive Interpretation: strong");
        expect(container.innerHTML.substring(23,(23+"Dimension: Reflective Interpretation: strong".length))).toBe("Dimension: Reflective Interpretation: strong");
        expect(container.innerHTML.substring(692,(692+"Dimension: Verbal Interpretation: strong".length))).toBe("Dimension: Verbal Interpretation: strong");
        expect(container.innerHTML.substring(1016,(1016+"Dimension: Global Interpretation: strong".length))).toBe("Dimension: Global Interpretation: strong");
    });

    test("Switch default case", () => {

        const dimScoreArray = [3, 3, 3, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const getILSDimension = jest.fn().mockImplementation((dim: number, score: number, something?: boolean) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return (dim: number, score: number, something?: boolean) => "test";
        });

        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => getILSDimension(1,1,true)}/>
        )

        //Because the Switch is not working in the test, the following String has 2 spaces at the end
        expect(container.innerHTML.substring(778,785)).toBe("Part2  ")
    });
});
