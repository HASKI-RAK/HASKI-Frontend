import { Contact } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Test the Contact page", () => {
  test("renders correctly and matches snapshot", () => {
    const tree = renderer.create(<Contact />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
