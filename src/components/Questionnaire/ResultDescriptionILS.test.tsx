import "@testing-library/jest-dom";
import {ResultDescriptionILS} from "./ResultDescriptionILS";
import {setILSParameters, ILSDimension} from "./TableILS";
import {render} from "@testing-library/react";

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

        expect(container.innerHTML.substring(246,(246+"Active.moderate".length))).toBe("Active.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is active & strong", () => {

        const dimScoreArray = [9, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )


        expect(container.innerHTML.substring(246,(246+"Active.strong".length))).toBe("Active.strong");
    });

    test("3 dimensions are balanced, 1 Dimension is reflective & moderate", () => {

        const dimScoreArray = [-5, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(250,(250+"Reflective.moderate".length))).toBe("Reflective.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is reflective & strong", () => {

        const dimScoreArray = [-9, 3, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(250,(250+"Reflective.strong".length))).toBe("Reflective.strong");
    });

    test("3 dimensions do not matter, 1 Dimension is reflective & balanced", () => {

        const dimScoreArray = [-3, 5, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1198,(1198+"SomethingBalanced.processing".length))).toBe("SomethingBalanced.processing");
    });

    test("3 dimensions are balanced, 1 Dimension is sensory & moderate", () => {

        const dimScoreArray = [3, 5, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(247,(247+"Sensory.moderate".length))).toBe("Sensory.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is sensory & strong", () => {

        const dimScoreArray = [3, 9, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(247,(247+"Sensory.strong".length))).toBe("Sensory.strong");
    });

    test("3 dimensions are balanced, 1 Dimension is intuitive & moderate", () => {

        const dimScoreArray = [3, -5, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(249,(249+"Intuitive.moderate".length))).toBe("Intuitive.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is intuitive & strong", () => {

        const dimScoreArray = [3, -11, 3, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(249,(249+"Intuitive.strong".length))).toBe("Intuitive.strong");
    });

    test("3 dimensions do not matter, 1 Dimension is intuitive & balanced", () => {

        const dimScoreArray = [5, -3, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1196,(1196+"SomethingBalanced.perception".length))).toBe("SomethingBalanced.perception");
    });

    test("3 dimensions are balanced, 1 Dimension is visual & moderate", () => {

        const dimScoreArray = [3, 3, 5, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(246,(246+"Visual.moderate".length))).toBe("Visual.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is visual & strong", () => {

        const dimScoreArray = [3, 3, 9, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(246,(246+"Visual.strong".length))).toBe("Visual.strong");
    });

    test("3 dimensions are balanced, 1 Dimension is verbal & moderate", () => {

        const dimScoreArray = [3, 3, -5, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(246,(246+"Verbal.moderate".length))).toBe("Verbal.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is verbal & strong", () => {

        const dimScoreArray = [3, 3, -9, 3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(246,(246+"Verbal.strong".length))).toBe("Verbal.strong");
    });

    test("3 dimensions do not matter, 1 Dimension is verbal & balanced", () => {

        const dimScoreArray = [5, 5, -3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1198,(1198+"SomethingBalanced.presentation".length))).toBe("SomethingBalanced.presentation");
    });

    test("3 dimensions are balanced, 1 Dimension is sequential & moderate", () => {

        const dimScoreArray = [3, 3, 3, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(250,(250+"Sequential.moderate".length))).toBe("Sequential.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is sequential & strong", () => {

        const dimScoreArray = [3, 3, 3, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(250,(250+"Sequential.strong".length))).toBe("Sequential.strong");
    });

    test("3 dimensions are balanced, 1 Dimension is global & moderate", () => {

        const dimScoreArray = [3, 3, 3, -5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(246,(246+"Global.moderate".length))).toBe("Global.moderate");
    });

    test("3 dimensions are balanced, 1 Dimension is global & strong", () => {

        const dimScoreArray = [3, 3, 3, -9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(246,(246+"Global.strong".length))).toBe("Global.strong");
    });

    test("3 dimensions do not matter, 1 Dimension is global & balanced", () => {

        const dimScoreArray = [5, 5, 5, -3];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(1190,(1190+"SomethingBalanced.organisation".length))).toBe("SomethingBalanced.organisation");
    });

    test("all dimensions moderate positive", () => {

        const dimScoreArray = [5, 5, 5, 5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(518,(518+"Sensory.moderate".length))).toBe("Sensory.moderate");
        expect(container.innerHTML.substring(246,(246+"Active.moderate".length))).toBe("Active.moderate");
        expect(container.innerHTML.substring(790,(790+"Visual.moderate".length))).toBe("Visual.moderate");
        expect(container.innerHTML.substring(1065,(1065+"Sequential.moderate".length))).toBe("Sequential.moderate");
    });

    test("all dimensions strong positive", () => {

        const dimScoreArray = [9, 9, 9, 9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(516,(516+"Sensory.strong".length))).toBe("Sensory.strong");
        expect(container.innerHTML.substring(246,(246+"Active.strong".length))).toBe("Active.strong");
        expect(container.innerHTML.substring(786,(786+"Visual.strong".length))).toBe("Visual.strong");
        expect(container.innerHTML.substring(1059,(1059+"Sequential.strong".length))).toBe("Sequential.strong");
    });

    test("all dimensions moderate negative", () => {

        const dimScoreArray = [-5, -5, -5, -5];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(528,(528+"Intuitive.moderate".length))).toBe("Intuitive.moderate");
        expect(container.innerHTML.substring(250,(250+"Reflective.moderate".length))).toBe("Reflective.moderate");
        expect(container.innerHTML.substring(802,(802+"Verbal.moderate".length))).toBe("Verbal.moderate");
        expect(container.innerHTML.substring(1073,(1073+"Global.moderate".length))).toBe("Global.moderate");
    });

    test("all dimensions strong negative", () => {

        const dimScoreArray = [-9, -9, -9, -9];
        setILSParameters(dimScoreArray[0], dimScoreArray[1], dimScoreArray[2], dimScoreArray[3]);
        const {container} = render(
            <ResultDescriptionILS ILSdim={ (n:number,b:number,c?:boolean|undefined) => ILSDimension(n,b,c)}/>
        )

        expect(container.innerHTML.substring(526,(526+"Intuitive.strong".length))).toBe("Intuitive.strong");
        expect(container.innerHTML.substring(250,(250+"Reflective.strong".length))).toBe("Reflective.strong");
        expect(container.innerHTML.substring(798,(798+"Verbal.strong".length))).toBe("Verbal.strong");
        expect(container.innerHTML.substring(1067,(1067+"Global.strong".length))).toBe("Global.strong");
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
        expect(container.innerHTML.substring(686,693)).toBe("Part2  ")

    });

});
