import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import BreadcrumbsContainer from "./BreadcrumbsContainer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("BreadcrumbsContainer", () => {
  it("should render the default breadcrumb with one home", () => {
    const history = createMemoryHistory({ initialEntries: ["/home"] });

    const { getAllByText, getByText } = render(
      <Router location={history.location} navigator={history}>
        <BreadcrumbsContainer />
      </Router>
    );
    expect(getAllByText("pages.home").length).toEqual(1);
    expect(getByText("/")).toBeInTheDocument();

    // click first link:
    fireEvent.click(getAllByText("pages.home")[0]);
    expect(history.location.pathname).toEqual("/");
  });

  it("should render the default breadcrumb with default path", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useLocation: () => ({
        pathname: "localhost:8080/",
      }),
    }));
    const { getAllByText, getByText } = render(
      <Router location={history.location} navigator={history}>
        <BreadcrumbsContainer />
      </Router>
    );
    expect(getAllByText("pages.home").length).toEqual(1);
    expect(getByText("/")).toBeInTheDocument();

    // click first link:
    fireEvent.click(getAllByText("pages.home")[0]);
    expect(history.location.pathname).toEqual("/");
  });

  it("should render a longer breadcrumb", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useLocation: () => ({
        pathname: "localhost:8080/example/path",
      }),
    }));

    const history = createMemoryHistory({ initialEntries: ["/example/path"] });

    const { getAllByText } = render(
      <Router location={history.location} navigator={history}>
        <BreadcrumbsContainer />
      </Router>
    );
    expect(getAllByText("pages.home").length).toEqual(1);
    expect(getAllByText("/").length).toEqual(2);

    // click first link:
    fireEvent.click(getAllByText("pages.example")[0]);
    expect(history.location.pathname).toEqual("/example");
  });
});
