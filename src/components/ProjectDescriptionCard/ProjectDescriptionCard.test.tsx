import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ProjectDescriptionCard from "./ProjectDescriptionCard";
import { useProjectDescriptionCard as _useProjectDescriptionCard } from "./ProjectDescriptionCard.hooks";
import React, { useRef } from "react";

const mockProjectDescriptionCardProps = {
  body: "body",
  header: "header",
};

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

Object.assign(window, {
  scrollY: 1000,
  scrollTop: 50,
}).dispatchEvent(new window.Event("scroll"));

describe("ProjectDescriptionCard tests", () => {
  test("ProjectDescriptionCard renders without input", () => {
    const { getByTestId } = render(<ProjectDescriptionCard />);
    const projectDescriptionCard = getByTestId("projectDescriptionCard");
    expect(projectDescriptionCard).toBeInTheDocument();
  });

  test("ProjectDescriptionCard without input can be scrolled", () => {
    window.dispatchEvent(new Event("scroll"));

    const { getByTestId } = render(<ProjectDescriptionCard />);
    const projectDescriptionCard = getByTestId("projectDescriptionCard");
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(projectDescriptionCard).toBeInTheDocument();
  });

  test("ProjectDescriptionCard renders with input", () => {
    const { getByTestId } = render(
      <ProjectDescriptionCard
        body={mockProjectDescriptionCardProps.body}
        header={mockProjectDescriptionCardProps.header}
      >
        <></>
      </ProjectDescriptionCard>
    );

    const projectDescriptionCard = getByTestId("projectDescriptionCard");
    expect(projectDescriptionCard).toBeInTheDocument();
  });

  test("ProjectDescriptionCard with input can be scrolled", () => {
    window.dispatchEvent(new Event("scroll"));
    const { getByTestId, getByRole } = render(
      <ProjectDescriptionCard
        body={mockProjectDescriptionCardProps.body}
        header={mockProjectDescriptionCardProps.header}
      >
        <></>
      </ProjectDescriptionCard>
    );

    const projectDescriptionCard = getByTestId("projectDescriptionCard");
    const header = getByRole("heading");

    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    fireEvent.scroll(global.document, { target: { scrollY: 1000 } });

    // expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);

    expect(header.textContent).toBe(mockProjectDescriptionCardProps.header);
  });
  // TODO: Renders with input

  // TODO: Scrolls down the page with and without input

  // TODO: Scroll wenn schon mal gescrollt wurde mit input
  test("it", () => {
    global.innerHeight = 500;
    global.document.body.scrollTop = 50;

    const { rerender, getByTestId, getByRole } = render(
      <ProjectDescriptionCard
        body={mockProjectDescriptionCardProps.body}
        header={mockProjectDescriptionCardProps.header}
      >
        <></>
      </ProjectDescriptionCard>
    );

    const projectDescriptionCard = getByTestId("projectDescriptionCard");
    const header = getByRole("heading");

    global.document.dispatchEvent(new Event("scroll"));
    jest.runOnlyPendingTimers();

    expect(header.textContent).toBe(mockProjectDescriptionCardProps.header);
  });
});
