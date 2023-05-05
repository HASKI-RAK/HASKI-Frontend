import { createContext, useContext } from "react";
import { SnackbarMessageProps } from "@components";

export type SnackbarContextType = {
  snackbarsErrorWarning: SnackbarMessageProps[];
  snackbarsSuccessInfo: SnackbarMessageProps[];
  setSnackbarsErrorWarning: (newSnackbars: SnackbarMessageProps[]) => void;
  setSnackbarsSuccessInfo: (newSnackbars: SnackbarMessageProps[]) => void;
  addSnackbar: (newSnackbar: SnackbarMessageProps) => void;
  updateSnackbar: (snackbarToUpdate: SnackbarMessageProps) => void;
  removeSnackbar: (snackbarToRemove: SnackbarMessageProps) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  snackbarsErrorWarning: [],
  snackbarsSuccessInfo: [],
  setSnackbarsErrorWarning: (newSnackbars) => {},
  setSnackbarsSuccessInfo: (newSnackbars) => {},
  addSnackbar: (newSnackbar) => {},
  updateSnackbar: (snackbarToUpdate) => {},
  removeSnackbar: (snackbarToRemove) => {},
});

export default SnackbarContext;
export const useSnackbarContext = () => useContext(SnackbarContext); // TODO: remove
