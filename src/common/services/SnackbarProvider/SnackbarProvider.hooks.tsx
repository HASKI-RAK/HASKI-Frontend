import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { SnackbarMessageProps } from "@components";

/**
 * @typedef {Object} SnackbarProviderHookReturn
 * @param {SnackbarMessageProps[]} snackbarsErrorWarning - The array of error and warning snackbars.
 * @param {SnackbarMessageProps[]} snackbarsSuccessInfo - The array of success and info snackbars.
 * @param {function} setSnackbarsErrorWarning - The function to set the error and warning snackbars.
 * @param {function} setSnackbarsSuccessInfo - The function to set the success and info snackbars.
 * @param {function} addSnackbar - The function to add a single snackbar.
 * @param {function} updateSnackbar - The function to update a single snackbar.
 * @param {function} removeSnackbar - The function to remove a single snackbar.
 */
type SnackbarProviderHookReturn = {
  readonly snackbarsErrorWarning: SnackbarMessageProps[];
  readonly snackbarsSuccessInfo: SnackbarMessageProps[];
  readonly setSnackbarsErrorWarning: Dispatch<
    SetStateAction<SnackbarMessageProps[]>
  >;
  readonly setSnackbarsSuccessInfo: Dispatch<
    SetStateAction<SnackbarMessageProps[]>
  >;
  readonly addSnackbar: (newSnackbar: SnackbarMessageProps) => void;
  readonly updateSnackbar: (snackbarToUpdate: SnackbarMessageProps) => void;
  readonly removeSnackbar: (snackbarToRemove: SnackbarMessageProps) => void;
};

/**
 * useSnackbarProvider presents a hook for the snackbar provider.
 * It can be used to inject the snackbar logic into a provider.
 * @returns {SnackbarProviderHookReturn} - The provider logic.
 * @category Services
 */
export const useSnackbarProvider = (): SnackbarProviderHookReturn => {
  const [snackbarsErrorWarning, setSnackbarsErrorWarning] = useState<
    SnackbarMessageProps[]
  >([]);
  const [snackbarsSuccessInfo, setSnackbarsSuccessInfo] = useState<
    SnackbarMessageProps[]
  >([]);

  // Adds a snackbar to the array of snackbars. It depends on the severity type which array is used.
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

  // Updates a snackbar in the array of snackbars. The message is used as a key to change an existing snackbar.
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

  // Removes a snackbar from the array of snackbars.
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
