import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Footer from "./Footer";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Footer", () => {
  test("should render the footer and click on every element", () => {
    const history = createMemoryHistory({ initialEntries: ["/home"] });

    const { getByText, getAllByRole } = render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>
    );
    expect(getByText(new Date().getFullYear())).toBeInTheDocument();

    // click on every button:
    for (let i = 0; i < getAllByRole("button").length; i++) {
      fireEvent.click(getAllByRole("button")[i]);
    }
  });
});
