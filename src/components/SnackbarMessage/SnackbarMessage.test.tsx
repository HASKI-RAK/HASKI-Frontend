import SnackbarMessage, { SnackbarMessageProps } from "./SnackbarMessage";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const mockErrorSnackbarMessageProps = {
  autoHideDuration: 10,
  message: "test",
  severity: "error",
  open: true,
} as SnackbarMessageProps;

const mockWarningSnackbarMessageProps = {
  autoHideDuration: 10,
  message: "test",
  severity: "warning",
  open: false,
} as SnackbarMessageProps;

const mockSuccessSnackbarMessageProps = {
  autoHideDuration: 0,
  message: "test",
  severity: "success",
  open: true,
} as SnackbarMessageProps;

describe("Test SnackbarMessage", () => {
  test("SnackbarMessage renders without input", () => {
    const { getByTestId } = render(<SnackbarMessage />);
    const snackbarMessage = getByTestId("snackbarMessage");
    expect(snackbarMessage).toBeInTheDocument();
  });

  test("SnackbarMessage renders with error input", () => {
    const { getByTestId } = render(
      <SnackbarMessage {...mockErrorSnackbarMessageProps} />
    );
    const snackbarMessage = getByTestId("snackbarMessage");
    expect(snackbarMessage).toBeInTheDocument();
  });

  test("SnackbarMessage renders with warning input", () => {
    const { getByTestId } = render(
      <SnackbarMessage {...mockWarningSnackbarMessageProps} />
    );
    const snackbarMessage = getByTestId("snackbarMessage");
    expect(snackbarMessage).toBeInTheDocument();
  });

  test("SnackbarMessage renders with success input", () => {
    const { getByTestId } = render(
      <SnackbarMessage {...mockSuccessSnackbarMessageProps} />
    );
    const snackbarMessage = getByTestId("snackbarMessage");
    expect(snackbarMessage).toBeInTheDocument();
  });

  test("SnackbarMessage closes after timeout", () => {
    render(<SnackbarMessage {...mockErrorSnackbarMessageProps} />);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });

    expect(setTimeout).toHaveBeenCalledTimes(6);
  });

  test("SnackbarMessage closes after button click", () => {
    const { getByRole } = render(
      <SnackbarMessage {...mockSuccessSnackbarMessageProps} />
    );

    expect(setTimeout).toHaveBeenCalledTimes(1);
    const button = getByRole("button");
    fireEvent.click(button);

    act(() => {
      jest.runAllTimers();
    });

    expect(setTimeout).toHaveBeenCalledTimes(4);
  });
});
