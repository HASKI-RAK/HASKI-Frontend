import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { Dashboard } from "./Dashboard";

describe("Test the demo component", () => {
  const mockCallback = jest.fn();

  test("renders HASKI basic label", () => {
    const landingPage = render(
      <Dashboard
        userState={{
          user: { firstName: "Max", surName: "Mustermann" },
          increaseUserId: () => mockCallback(),
        }}
      />
    );
    const button = landingPage.getByText("one up");
    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toEqual(1);
    expect(mockCallback).toBeCalled();
  });

  test("renders correctly", () => {
    const mockCallback = jest.fn();
    const tree = renderer
      .create(
        <Dashboard
          userState={{
            user: { firstName: "Max", surName: "Mustermann" },
            increaseUserId: () => mockCallback(),
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
