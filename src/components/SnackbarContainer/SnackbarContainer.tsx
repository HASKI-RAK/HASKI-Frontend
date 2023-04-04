import { useEffect, useState } from "react";
import { SnackbarEntry } from "@components";
import { useSnackbarContext, useNetworkStatus } from "@services";
import {
  DefaultStack as Stack,
  DefaultSnackbar as Snackbar,
} from "@common/components";

const SnackbarContainer: React.FC = () => {
  const {
    snackbarsErrorWarning,
    snackbarsSuccessInfo,
    addSnackbar,
    updateSnackbar,
  } = useSnackbarContext();

  const isOnline = useNetworkStatus();
  const [recentlyOffline, setRecentlyOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setRecentlyOffline(true);
      addSnackbar({
        severity: "warning",
        message: "You are offline", // TODO: Add translation
        autoHideDuration: undefined,
      });
    }

    if (isOnline && recentlyOffline) {
      setRecentlyOffline(false);
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
    <>
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
            <SnackbarEntry key={snackbar.message} snackbar={snackbar} />
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
            <SnackbarEntry key={snackbar.message} snackbar={snackbar} />
          ))}
        </Stack>
      </Snackbar>
    </>
  );
};

export default SnackbarContainer;
