import { QuestionnaireResults } from "./QuestionnaireResults";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Test the Home page", () => {
    test("renders correctly and matches snapshot", () => {
        const tree = renderer.create(<QuestionnaireResults />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
