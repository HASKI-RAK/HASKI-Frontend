import { Home } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Test the Home page", () => {
  test("renders correctly and matches snapshot", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
