import { useEffect, useState, useContext, forwardRef } from "react";
import { SnackbarMessage } from "@components";
import { SnackbarContext, useNetworkStatus } from "@services";
import {
  DefaultStack as Stack,
  DefaultSnackbar as Snackbar,
} from "@common/components";

const SnackbarContainer = () => {
  const {
    snackbarsErrorWarning,
    snackbarsSuccessInfo,
    addSnackbar,
    updateSnackbar,
  } = useContext(SnackbarContext);

  const isOnline = useNetworkStatus();
  const [recentlyOffline, setRecentlyOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setRecentlyOffline(true);
      console.log("recentlyOffline:" + recentlyOffline);
      addSnackbar({
        severity: "warning",
        message: "You are offline", // TODO: Add translation
        autoHideDuration: undefined,
      });
    }

    if (isOnline && recentlyOffline) {
      setRecentlyOffline(false);
      console.log("recentlyOffline:" + recentlyOffline);
      addSnackbar({
        severity: "warning",
        message: "You are online again", // TODO: Add translation
        autoHideDuration: 3000,
      });
      updateSnackbar({
        severity: "warning",
        message: "You are offline", // TODO: Add translation
        autoHideDuration: 1,
      });
    }
  }, [isOnline]);

  return (
    <div data-testid="snackbarContainer">
      <Snackbar
        open={!!snackbarsErrorWarning[0]}
        autoHideDuration={null}
        transitionDuration={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack flexDirection="column" gap={1}>
          {snackbarsErrorWarning.map((snackbar) => (
            <SnackbarMessage key={snackbar.message} {...snackbar} />
          ))}
        </Stack>
      </Snackbar>
      <Snackbar
        open={!!snackbarsSuccessInfo[0]}
        autoHideDuration={null}
        transitionDuration={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack flexDirection="column" gap={1}>
          {snackbarsSuccessInfo.map((snackbar) => (
            <SnackbarMessage key={snackbar.message} {...snackbar} />
          ))}
        </Stack>
      </Snackbar>
    </div>
  );
};

export default SnackbarContainer;
