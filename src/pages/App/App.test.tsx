import { App } from "@pages";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  }),
) as jest.Mock;

describe("Test the demo component", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
