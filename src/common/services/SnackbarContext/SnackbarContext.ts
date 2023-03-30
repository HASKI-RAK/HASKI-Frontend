import { createContext, useContext } from "react";
import { SnackbarProps } from "@components";

export type SnackbarContextType = {
  snackbarsErrorWarning: SnackbarProps[];
  snackbarsSuccessInfo: SnackbarProps[];
  setSnackbarsErrorWarning: (newSnackbars: SnackbarProps[]) => void;
  setSnackbarsSuccessInfo: (newSnackbars: SnackbarProps[]) => void;
  addSnackbar: (newSnackbar: SnackbarProps) => void;
  updateSnackbar: (snackbarToUpdate: SnackbarProps) => void;
  removeSnackbar: (snackbarToRemove: SnackbarProps) => void;
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

export const useSnackbarContext = () => useContext(SnackbarContext);
