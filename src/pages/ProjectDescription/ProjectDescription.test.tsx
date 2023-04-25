import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ProjectDescription from "./ProjectDescription";

describe("Test the ProjectDescription page", () => {
  it("should render the ProjectDescription page", () => {
    const projectDescription = render(<ProjectDescription />);

    expect(
      projectDescription.container.querySelectorAll("span").length
    ).toEqual(2);
  });
});
