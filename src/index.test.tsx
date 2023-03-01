import { App } from "@pages";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  }),
) as jest.Mock;

describe("Test the landing page", () => {
  test("renders HASKI basic label", () => {
    const landingPage = render(<App />);
    expect(landingPage.getByText("Hello with ID:")).toBeInTheDocument();
  });
});
