import { Alert, Slide, Grow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar, SnackbarProps, Severity } from "@components";
import { useState, useCallback, useEffect } from "react";

type TransitionProps = {
  children?: React.ReactElement;
  in?: boolean;
  severity?: Severity;
  timeout?: number;
};

const Transition = (props: TransitionProps) => {
  if (props.children === undefined) {
    return null;
  }

  switch (props.severity) {
    case "error":
    case "warning":
      return <Slide in={props.in}>{props.children}</Slide>;
    case "success":
    case "info":
    default:
      return <Grow in={props.in}>{props.children}</Grow>;
  }
};

type SnackbarEntryProps = {
  snackbar?: SnackbarProps;
  timeout?: number;
};

export const SnackbarEntry: React.FC<SnackbarEntryProps> = ({
  snackbar,
  timeout, // Ne der Timeout muss irgendwie in die add und nicht hierein wtf
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const { removeSnackbar } = useSnackbar();

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      snackbar && removeSnackbar(snackbar);
    }, timeout);
  }, [snackbar?.message, removeSnackbar]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (snackbar?.onClose) {
      snackbar.onClose();
    }
    close();
  };

  useEffect(() => {
    if (snackbar?.autoHideDuration !== 0) {
      setTimeout(() => {
        close();
      }, snackbar?.autoHideDuration || 6000);
    }
  }, [close, snackbar?.autoHideDuration]);

  return (
    <>
      {snackbar?.severity && (
        <Transition severity={snackbar.severity} in={open}>
          {snackbar.severity && (
            <Alert
              onClick={handleClose}
              onClose={handleClose}
              severity={snackbar.severity}
            >
              <Typography>
                {
                  t(snackbar.severity) +
                    ": " +
                    snackbar.message /*Put that shit into translation file */
                }
              </Typography>
            </Alert>
          )}
        </Transition>
      )}
    </>
  );
};
