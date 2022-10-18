import { App } from "@pages";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Test the demo component", () => {
  test("renders HASKI basic label", () => {
    const landingPage = render(<App />);
    expect(landingPage.getByText("Hello with ID:")).toBeInTheDocument();
  });

  test("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
