import { useState, useCallback, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SnackbarContext } from "@services";
import { SnackbarTransition } from "@components";
import {
  DefaultAlert as Alert,
  DefaultTypography as Typography,
} from "@common/components";

export type SeverityType = "error" | "success" | "warning" | "info";

export type SnackbarMessageProps = {
  autoHideDuration?: number;
  message?: string;
  severity?: SeverityType;
};

const SnackbarMessage = (props: SnackbarMessageProps) => {
  const { t } = useTranslation();
  const [openTransition, setOpenTransition] = useState(true);
  const { removeSnackbar } = useContext(SnackbarContext);

  const close = useCallback(() => {
    setOpenTransition(false);
    setTimeout(() => {
      props && removeSnackbar(props);
    }, 1000);
  }, [props?.message, removeSnackbar]);

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (
      typeof props?.autoHideDuration === "number" &&
      props?.autoHideDuration !== 0
    ) {
      setTimeout(() => {
        close();
      }, props?.autoHideDuration);
    }
  }, [close, props?.autoHideDuration]);

  return (
    <div data-testid="snackbarMessage">
      {props?.severity && (
        <SnackbarTransition severity={props.severity} in={openTransition}>
          {props.severity && (
            <Alert
              onClick={handleClose}
              onClose={handleClose}
              severity={props.severity}
              data-testid="snackbarMessageAlert"
            >
              <Typography>
                {
                  t(props.severity) + ": " + props.message //TODO: Put that shit into translation file */
                }
              </Typography>
            </Alert>
          )}
        </SnackbarTransition>
      )}
    </div>
  );
};

export default SnackbarMessage;
