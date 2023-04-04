import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbarContext } from "@services";
import {
  DefaultAlert as Alert,
  DefaultSlide as Slide,
  DefaultGrow as Grow,
  DefaultTypography as Typography,
} from "@common/components";

export type SeverityType = "error" | "success" | "warning" | "info";

export type SnackbarProps = {
  autoHideDuration?: number;
  message?: string;
  severity?: SeverityType;
  open?: boolean;
};

type TransitionProps = {
  children?: React.ReactElement;
  in?: boolean;
  severity?: SeverityType;
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

type SnackbarMessageProps = {
  children?: React.ReactElement;
  snackbar?: SnackbarProps;
};

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({ snackbar }) => {
  const { t } = useTranslation();
  const [openTransition, setOpenTransition] = useState(true);
  const { removeSnackbar } = useSnackbarContext();

  const close = useCallback(() => {
    setOpenTransition(false);
    setTimeout(() => {
      snackbar && removeSnackbar(snackbar);
    }, 1000);
  }, [snackbar?.message, removeSnackbar]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    close();
  };

  useEffect(() => {
    if (
      typeof snackbar?.autoHideDuration === "number" &&
      snackbar?.autoHideDuration !== 0
    ) {
      setTimeout(() => {
        close();
      }, snackbar?.autoHideDuration);
    }
  }, [close, snackbar?.autoHideDuration]);

  useEffect(() => {
    console.log(snackbar?.open);
    if (snackbar?.open === false) {
      close();
    }
  }, [close, snackbar?.open]);

  return (
    <>
      {snackbar?.severity && (
        <Transition severity={snackbar.severity} in={openTransition}>
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

export default SnackbarMessage;
