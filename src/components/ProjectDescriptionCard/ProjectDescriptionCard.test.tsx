import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ProjectDescriptionCard from "./ProjectDescriptionCard";

const mockProjectDescriptionCardProps = {
  body: "body",
  header: "header",
};

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("ProjectDescriptionCard tests", () => {
  test("ProjectDescriptionCard renders without input", () => {
    const { getByTestId } = render(<ProjectDescriptionCard />);
    const projectDescriptionCard = getByTestId("projectDescriptionCard");
    expect(projectDescriptionCard).toBeInTheDocument();
  });

  test("ProjectDescriptionCard without input can be scrolled", () => {
    window.innerHeight = 1000;
    // window.document.

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
    window.innerHeight = 1000;
    window.dispatchEvent(new Event("scroll"));

    /*const { getByTestId, getByRole } = render(
      <ProjectDescriptionCard
        body={mockProjectDescriptionCardProps.body}
        header={mockProjectDescriptionCardProps.header}
      >
        <></>
      </ProjectDescriptionCard>
    );*/

    //const projectDescriptionCard = getByTestId("projectDescriptionCard");
    //const header = getByRole("heading");

    const ProjectDescriptionCard = require("./ProjectDescriptionCard");
    ProjectDescriptionCard();
    screen.debug();
    /*Object.defineProperty(projectDescriptionCard, "scrollHeight", {
      value: 1000,
    });
    fireEvent.scroll(projectDescriptionCard, {
      target: { scrollLeft: 1000 },
    });*/
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    fireEvent.scroll(global.document, { target: { scrollY: 1000 } });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);

    // expect(header.textContent).toBe(mockProjectDescriptionCardProps.header);
  });
  // TODO: Renders with input

  // TODO: Scrolls down the page with and without input

  // TODO: Scroll wenn schon mal gescrollt wurde mit input
});
