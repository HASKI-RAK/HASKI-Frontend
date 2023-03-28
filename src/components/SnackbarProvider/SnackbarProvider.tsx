import { useState, useContext, createContext, useMemo } from "react";

export type Severity = "error" | "success" | "warning" | "info";

export type SnackbarProps = {
  message?: string;
  children?: React.ReactNode;
  autoHideDuration?: number;
  severity?: Severity;
  onClose?: () => void;
  // hier irgendwie timeout hs
};

export type SnackbarContextProps = {
  snackbarsErrorWarning: SnackbarProps[];
  snackbarsSuccessInfo: SnackbarProps[];
  setSnackbarsErrorWarning: (newSnackbars: SnackbarProps[]) => void;
  setSnackbarsSuccessInfo: (newSnackbars: SnackbarProps[]) => void;
  addSnackbar: (newSnackbar: SnackbarProps) => void;
  removeSnackbar: (snackbarToRemove: SnackbarProps) => void;
};

const SnackbarContext = createContext<SnackbarContextProps>({
  snackbarsErrorWarning: [],
  snackbarsSuccessInfo: [],
  setSnackbarsErrorWarning: (newSnackbars) => {},
  setSnackbarsSuccessInfo: (newSnackbars) => {},
  addSnackbar: (newSnackbar) => {},
  removeSnackbar: (snackbarToRemove) => {},
});

const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [snackbarsErrorWarning, setSnackbarsErrorWarning] = useState<
    SnackbarProps[]
  >([]);
  const [snackbarsSuccessInfo, setSnackbarsSuccessInfo] = useState<
    SnackbarProps[]
  >([]);

  const addSnackbar = (newSnackbar: SnackbarProps) => {
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

  const removeSnackbar = (snackbarToRemove: SnackbarProps) => {
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

  const snackbarProviderValue = useMemo(
    () => ({
      snackbarsErrorWarning,
      snackbarsSuccessInfo,
      setSnackbarsErrorWarning,
      setSnackbarsSuccessInfo,
      addSnackbar,
      removeSnackbar,
    }),
    [
      snackbarsErrorWarning,
      snackbarsSuccessInfo,
      setSnackbarsErrorWarning,
      setSnackbarsSuccessInfo,
      addSnackbar,
      removeSnackbar,
    ]
  );

  return (
    <SnackbarContext.Provider value={snackbarProviderValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
export default SnackbarProvider;
