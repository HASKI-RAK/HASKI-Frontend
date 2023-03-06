import "@testing-library/jest-dom";
import {ResultDescriptionListK} from "@components";
import {setListKParameters} from "./TableListK";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => {
                if(str === 'components.QuestionnaireResults.TableILS.balanced') return 'balanced'
                else return str;
            },
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

describe("Test ResultDescriptionListK with all Methods",
    () => {

        test("General Description is correct", () => {
            const cognitiveStrat = [1, 1, 1, 1];
            const metaCognitiveStrat = [1, 1, 1];
            const interStrat = [1, 1, 1];
            const exterStrat = [1, 1, 1];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[0].key).toBe("GeneralDescriptionListK");
            expect(container.key).toMatch("ResultDescriptionListK");

        });

        test("All Descriptions are shown (when everything is below 3)", () => {
            const cognitiveStrat = [1, 1, 1, 1];
            const interStrat = [1, 1, 1];
            const metaCognitiveStrat = [1, 1, 1];
            const exterStrat = [1, 1, 1];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], metaCognitiveStrat[0],
                metaCognitiveStrat[1], metaCognitiveStrat[2], interStrat[0], interStrat[1], interStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children.length).toBe(4);
            expect(container.key).toMatch("ResultDescriptionListK");
            expect(container.props.children[1][0].key).toMatch("CognitiveStrategiesDescriptionListK");
            expect(container.props.children[2][0].key).toMatch("MetaCognitiveStrategiesDescriptionListK");
            expect(container.props.children[3][0].key).toMatch("RelevantSubscalesBelow3DescriptionListK");
        });

        test("General Description and Cognitive Strategies is shown", () => {
            const cognitiveStrat = [1, 1, 1, 1];
            const interStrat = [5, 5, 5];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [5, 5, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();


            expect(container.key).toMatch("ResultDescriptionListK");
            expect(container.props.children[1][0].key).toMatch("CognitiveStrategiesDescriptionListK");
            expect(container.props.children[2]).toStrictEqual([]);
            expect(container.props.children[3]).toStrictEqual([]);
        });

        test("General Description and Metacognitive Strategies is shown", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [5, 5, 5];
            const metaCognitiveStrat = [1, 1, 1];
            const exterStrat = [5, 5, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();


            expect(container.key).toMatch("ResultDescriptionListK");
            expect(container.props.children[1]).toStrictEqual([]);
            expect(container.props.children[2][0].key).toMatch("MetaCognitiveStrategiesDescriptionListK");
            expect(container.props.children[3]).toStrictEqual([]);
        });

        test("Attention and Time below 3", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [1, 5, 1];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [5, 5, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[3][0].props.children[0].props.children.substring(55, 79)).toMatch("attention && time Below3");
        });

        test("Attention below 3", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [1, 5, 5];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [5, 5, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[3][0].props.children[0].props.children.substring(55, 71)).toMatch("attention Below3");
        });

        test("Attention and Time below 3", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [1, 5, 1];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [5, 5, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[3][0].props.children[0].props.children.substring(55, 79)).toMatch("attention && time Below3");
        });

        test("Attention and Time and Learning with Classmates below 3", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [1, 5, 1];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [1, 5, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[3][0].props.children[0].props.children.substring(55, 102)).toMatch("attention && time && learnWithClassmates Below3");
        });

        test("Attention and Time and Learning with Classmates and Literature Reasearch below 3", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [1, 5, 1];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [1, 1, 5];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[3][0].props.children[0].props.children.substring(55, 124)).toMatch("attention && time && learnWithClassmates && literatureResearch Below3");
        });

        test("Attention and Time and Learning with Classmates and Literature Reasearch and Learning Environment below 3", () => {
            const cognitiveStrat = [5, 5, 5, 5];
            const interStrat = [1, 5, 1];
            const metaCognitiveStrat = [5, 5, 5];
            const exterStrat = [1, 1, 1];

            setListKParameters(cognitiveStrat[0], cognitiveStrat[1], cognitiveStrat[2], cognitiveStrat[3], interStrat[0],
                interStrat[1], interStrat[2], metaCognitiveStrat[0], metaCognitiveStrat[1], metaCognitiveStrat[2], exterStrat[0],
                exterStrat[1], exterStrat[2]);

            const container = ResultDescriptionListK();

            expect(container.props.children[3][0].props.children[0].props.children.substring(55, 147)).toMatch("attention && time && learnWithClassmates && literatureResearch && learningEnvironment Below3");
        });

    });