import "@testing-library/jest-dom";
import {SetData, GraphListK} from "./GraphListK";
import {render} from "@testing-library/react";
import React from "react";
import {getListKParameters} from "./TableListK";


jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
        }
    },
}))

describe("Test GraphListK with all Methods",
    () => {
    test("Required data is returned in correct format", () => {
        const data = SetData();

        expect(data.nodes.length).toBe(18);
        expect(data.links.length).toBe(17);

        expect(data.nodes[0].id).toMatch("components.QuestionnaireResults.TableListK.Cognitive strategies");
        expect(data.nodes[1].id).toMatch("components.QuestionnaireResults.TableListK.Internal resource management strategies");
        expect(data.nodes[2].id).toMatch("components.QuestionnaireResults.TableListK.Metacognitive strategies");
        expect(data.nodes[3].id).toMatch("components.QuestionnaireResults.TableListK.External resource management strategies");
        expect(data.nodes[4].id).toMatch("List K");
        expect(data.nodes[5].id).toContain("components.QuestionnaireResults.TableListK.Organize");
        expect(data.nodes[6].id).toContain("components.QuestionnaireResults.TableListK.Elaborate");
        expect(data.nodes[7].id).toContain("components.QuestionnaireResults.TableListK.Critical review");
        expect(data.nodes[8].id).toContain("components.QuestionnaireResults.TableListK.Repeat");
        expect(data.nodes[9].id).toContain("components.QuestionnaireResults.TableListK.Attention");
        expect(data.nodes[10].id).toContain("components.QuestionnaireResults.TableListK.Effort");
        expect(data.nodes[11].id).toContain("components.QuestionnaireResults.TableListK.Time");
        expect(data.nodes[12].id).toContain("components.QuestionnaireResults.TableListK.Goals & plans");
        expect(data.nodes[13].id).toContain("components.QuestionnaireResults.TableListK.Control");
        expect(data.nodes[14].id).toContain("components.QuestionnaireResults.TableListK.Regulate");
        expect(data.nodes[15].id).toContain("components.QuestionnaireResults.TableListK.Learning with classmates");
        expect(data.nodes[16].id).toContain("components.QuestionnaireResults.TableListK.Literature research");
        expect(data.nodes[17].id).toContain("components.QuestionnaireResults.TableListK.Learning environment");

        expect(data.links[0].source).toMatch("List K");
        expect(data.links[0].target).toMatch("components.QuestionnaireResults.TableListK.Cognitive strategies");
        expect(data.links[1].source).toMatch("components.QuestionnaireResults.TableListK.Cognitive strategies");

        expect(data.links[5].source).toMatch("List K");
        expect(data.links[5].target).toMatch("components.QuestionnaireResults.TableListK.Internal resource management strategies");
        expect(data.links[6].source).toMatch("components.QuestionnaireResults.TableListK.Internal resource management strategies");

        expect(data.links[9].source).toMatch("List K");
        expect(data.links[9].target).toMatch("components.QuestionnaireResults.TableListK.Metacognitive strategies");
        expect(data.links[10].source).toMatch("components.QuestionnaireResults.TableListK.Metacognitive strategies");

        expect(data.links[13].source).toMatch("List K");
        expect(data.links[13].target).toMatch("components.QuestionnaireResults.TableListK.External resource management strategies");
        expect(data.links[14].source).toMatch("components.QuestionnaireResults.TableListK.External resource management strategies");

    });

    test("GraphListK renders correctly", async () => {
        const graphListK = render(
            <GraphListK />
        );

        const [
            averageCognitiveStrategies, averageInternalResourceManagementStrategies,
            averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies
        ] = getListKParameters()[1];

        expect(graphListK.getAllByText("Score: " + (Math.round((averageCognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2))[0]).toBeInTheDocument();
        expect(graphListK.getAllByText("Score: " + (Math.round((averageInternalResourceManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2))[0]).toBeInTheDocument();
        expect(graphListK.getAllByText("Score: " + (Math.round((averageMetacognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2))[0]).toBeInTheDocument();
        expect(graphListK.getAllByText("Score: " + (Math.round((averageExternalResourcesManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2))[0]).toBeInTheDocument();


        expect(graphListK).toMatchSnapshot();
    });

});