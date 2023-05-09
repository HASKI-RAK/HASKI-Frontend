import { act, render, renderHook } from "@testing-library/react";
import { useSnackbarProvider } from "./SnackbarProvider.hooks";
import { SnackbarProvider } from "@services";
import "@testing-library/jest-dom";

describe("Test SnackbarProvider", () => {
  test("SnackbarProvider renders correctly", () => {
    const { getByText } = render(
      <SnackbarProvider>
        <>Test</>
      </SnackbarProvider>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  test("functionality of SnackbarProvider hook", () => {
    const { result } = renderHook(() => useSnackbarProvider());

    expect(result.current).toMatchObject({
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: expect.any(Function),
      setSnackbarsSuccessInfo: expect.any(Function),
      addSnackbar: expect.any(Function),
      updateSnackbar: expect.any(Function),
      removeSnackbar: expect.any(Function),
    });

    act(() => {
      result.current.setSnackbarsErrorWarning([]);
      result.current.setSnackbarsSuccessInfo([]);

      // Add new snackbars
      result.current.addSnackbar({
        message: "error test",
        severity: "error",
        autoHideDuration: 1000,
      });
      result.current.addSnackbar({
        message: "success test",
        severity: "success",
        autoHideDuration: 1000,
      });

      // Update autohideduration of snackbars
      result.current.updateSnackbar({
        message: "error test",
        severity: "error",
        autoHideDuration: undefined,
      });
      result.current.updateSnackbar({
        message: "success test",
        severity: "success",
        autoHideDuration: undefined,
      });

      // Update severity of snackbars
      result.current.updateSnackbar({
        message: "error test",
        severity: "warning",
        autoHideDuration: undefined,
      });
      result.current.updateSnackbar({
        message: "success test",
        severity: "info",
        autoHideDuration: undefined,
      });

      // Update wrong snackbars
      result.current.updateSnackbar({
        message: "warning test",
        severity: "warning",
        autoHideDuration: 1000,
      });
      result.current.updateSnackbar({
        message: "info test",
        severity: "info",
        autoHideDuration: 1000,
      });
    });

    // Add the same snackbars
    act(() => {
      result.current.addSnackbar({
        message: "error test",
        severity: "error",
        autoHideDuration: undefined,
      });
      result.current.addSnackbar({
        message: "success test",
        severity: "success",
        autoHideDuration: undefined,
      });
    });

    act(() => {
      // Remove some snackbars
      result.current.removeSnackbar({
        message: "error test",
        severity: "error",
        autoHideDuration: undefined,
      });
      result.current.removeSnackbar({
        message: "success test",
        severity: "success",
        autoHideDuration: undefined,
      });

      // Remove wrong snackbars
      result.current.removeSnackbar({
        message: "warning test",
        severity: "warning",
        autoHideDuration: undefined,
      });
      result.current.removeSnackbar({
        message: "info test",
        severity: "info",
        autoHideDuration: undefined,
      });
    });

    // Add snackbars until the limit is reached
    act(() => {
      result.current.addSnackbar({
        message: "error test 2",
        severity: "error",
        autoHideDuration: undefined,
      });
      result.current.addSnackbar({
        message: "success test 2",
        severity: "success",
        autoHideDuration: undefined,
      });
    });

    act(() => {
      result.current.addSnackbar({
        message: "warning test 3",
        severity: "warning",
        autoHideDuration: undefined,
      });
      result.current.addSnackbar({
        message: "info test 3",
        severity: "info",
        autoHideDuration: undefined,
      });
    });

    act(() => {
      result.current.addSnackbar({
        message: "warning test 4",
        severity: "warning",
        autoHideDuration: undefined,
      });
      result.current.addSnackbar({
        message: "info test 4",
        severity: "info",
        autoHideDuration: undefined,
      });
    });

    act(() => {
      result.current.addSnackbar({
        message: "error test 5",
        severity: "error",
        autoHideDuration: undefined,
      });
      result.current.addSnackbar({
        message: "success test 5",
        severity: "success",
        autoHideDuration: undefined,
      });
    });

    expect(result.current).toMatchObject({
      snackbarsErrorWarning: [
        {
          autoHideDuration: undefined,
          message: "error test 5",
          severity: "error",
        },
        {
          autoHideDuration: undefined,
          message: "warning test 4",
          severity: "warning",
        },
        {
          autoHideDuration: undefined,
          message: "warning test 3",
          severity: "warning",
        },
      ],
      snackbarsSuccessInfo: [
        {
          autoHideDuration: undefined,
          message: "success test 5",
          severity: "success",
        },
        {
          autoHideDuration: undefined,
          message: "info test 4",
          severity: "info",
        },
        {
          autoHideDuration: undefined,
          message: "info test 3",
          severity: "info",
        },
      ],
      setSnackbarsErrorWarning: expect.any(Function),
      setSnackbarsSuccessInfo: expect.any(Function),
      addSnackbar: expect.any(Function),
      updateSnackbar: expect.any(Function),
      removeSnackbar: expect.any(Function),
    });
  });
});
