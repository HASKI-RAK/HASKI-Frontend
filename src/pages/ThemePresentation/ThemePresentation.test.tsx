import { ThemePresentation } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Test the ThemePresentation page", () => {
  test("renders correctly and matches snapshot", () => {
    const tree = renderer.create(<ThemePresentation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
