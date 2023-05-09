import SnackbarTransition from "./SnackbarTransition";
import { render } from "@testing-library/react";
import { SeverityType } from "@components";
import "@testing-library/jest-dom";

const mockErrorSnackbarTransitionProps = {
  children: <div>test</div>,
  in: true,
  severity: "error" as SeverityType,
  timeout: 10,
};

const mockSuccessSnackbarTransitionProps = {
  children: <div>test</div>,
  in: true,
  severity: "success" as SeverityType,
  timeout: 10,
};

describe("Test SnackbarTransition", () => {
  test("SnackbarTransition renders without input", () => {
    const { getByTestId } = render(<SnackbarTransition />);
    const snackbarTransition = getByTestId("snackbarTransition");
    expect(snackbarTransition).toBeInTheDocument();
  });

  test("SnackbarTransition renders with error input", () => {
    const { getByTestId } = render(
      <SnackbarTransition {...mockErrorSnackbarTransitionProps} />
    );
    const snackbarTransition = getByTestId("snackbarTransition");
    expect(snackbarTransition).toBeInTheDocument();
  });

  test("SnackbarTransition renders with success input", () => {
    const { getByTestId } = render(
      <SnackbarTransition {...mockSuccessSnackbarTransitionProps} />
    );
    const snackbarTransition = getByTestId("snackbarTransition");
    expect(snackbarTransition).toBeInTheDocument();
  });
});
