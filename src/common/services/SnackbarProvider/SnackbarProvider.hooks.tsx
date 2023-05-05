import { useState, useMemo } from "react";
import { SnackbarMessageProps } from "@components";

export const useSnackbarProvider = () => {
  const [snackbarsErrorWarning, setSnackbarsErrorWarning] = useState<
    SnackbarMessageProps[]
  >([]);
  const [snackbarsSuccessInfo, setSnackbarsSuccessInfo] = useState<
    SnackbarMessageProps[]
  >([]);

  const addSnackbar = (newSnackbar: SnackbarMessageProps) => {
    if (
      newSnackbar.severity === "error" ||
      newSnackbar.severity === "warning"
    ) {
      if (
        snackbarsErrorWarning.find(
          (snackbar) => snackbar.message === newSnackbar.message
        )
      ) {
        return;
      }
      const rest =
        snackbarsErrorWarning.length < 3
          ? snackbarsErrorWarning
          : snackbarsErrorWarning.slice(0, -1);
      setSnackbarsErrorWarning([newSnackbar, ...rest]);
    } else if (
      newSnackbar.severity === "success" ||
      newSnackbar.severity === "info"
    ) {
      if (
        snackbarsSuccessInfo.find(
          (snackbar) => snackbar.message === newSnackbar.message
        )
      ) {
        return;
      }
      const rest =
        snackbarsSuccessInfo.length < 3
          ? snackbarsSuccessInfo
          : snackbarsSuccessInfo.slice(0, -1);
      setSnackbarsSuccessInfo([newSnackbar, ...rest]);
    }
  };

  const updateSnackbar = (snackbarToUpdate: SnackbarMessageProps) => {
    if (
      snackbarToUpdate.severity === "error" ||
      snackbarToUpdate.severity === "warning"
    ) {
      setSnackbarsErrorWarning((previous) =>
        previous.map((snackbar) =>
          snackbar.message === snackbarToUpdate.message
            ? snackbarToUpdate
            : snackbar
        )
      );
    } else if (
      snackbarToUpdate.severity === "success" ||
      snackbarToUpdate.severity === "info"
    ) {
      setSnackbarsSuccessInfo((previous) =>
        previous.map((snackbar) =>
          snackbar.message === snackbarToUpdate.message
            ? snackbarToUpdate
            : snackbar
        )
      );
    }
  };

  const removeSnackbar = (snackbarToRemove: SnackbarMessageProps) => {
    if (
      snackbarToRemove.severity === "error" ||
      snackbarToRemove.severity === "warning"
    ) {
      setSnackbarsErrorWarning((previous) =>
        previous.filter((snackbar) => snackbar !== snackbarToRemove)
      );
    } else if (
      snackbarToRemove.severity === "success" ||
      snackbarToRemove.severity === "info"
    ) {
      setSnackbarsSuccessInfo((previous) =>
        previous.filter((snackbar) => snackbar !== snackbarToRemove)
      );
    }
  };

  return useMemo(
    () => ({
      snackbarsErrorWarning,
      snackbarsSuccessInfo,
      setSnackbarsErrorWarning,
      setSnackbarsSuccessInfo,
      addSnackbar,
      updateSnackbar,
      removeSnackbar,
    }),
    [
      snackbarsErrorWarning,
      snackbarsSuccessInfo,
      setSnackbarsErrorWarning,
      setSnackbarsSuccessInfo,
      addSnackbar,
      updateSnackbar,
      removeSnackbar,
    ]
  );
};
