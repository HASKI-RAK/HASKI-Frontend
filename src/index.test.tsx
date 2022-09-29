/**
 * @jest-environment jsdom
 */
import { App } from "./pages";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test the landing page", () => {
  test("renders HASKI basic label", () => {
    const landingPage = render(<App />);
    expect(landingPage.getByText("HASKI")).toBeInTheDocument();
  });
});
