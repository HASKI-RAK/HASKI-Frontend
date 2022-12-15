import {Glossary} from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Test the Glossary page", () => {
    test("renders correctly and matches snapshot", () => {
        const tree = renderer.create(<Glossary />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});