import { useEffect, useState, useContext } from "react";
import { SnackbarMessage } from "@components";
import { SnackbarContext, useNetworkStatus } from "@services";
import { useTranslation } from "react-i18next";
import {
  DefaultStack as Stack,
  DefaultSnackbar as Snackbar,
} from "@common/components";

/**
 * SnackbarContainer presents a container rendering the snackbars and their messages.
 * It can't be used as a standalone component and must be somewhere beneath the snackbar provider.
 * @returns {JSX.Element} - The snackbar container component.
 * @category Components
 */
const SnackbarContainer = () => {
  const {
    snackbarsErrorWarning,
    snackbarsSuccessInfo,
    addSnackbar,
    updateSnackbar,
    removeSnackbar,
  } = useContext(SnackbarContext);

  const { t } = useTranslation();
  const isOnline = useNetworkStatus();
  const [recentlyOffline, setRecentlyOffline] = useState(false);

  // Respectively adds a snackbar when internet connection is lost and regained.
  useEffect(() => {
    if (!isOnline) {
      setRecentlyOffline(true);
      console.log("recentlyOffline:" + recentlyOffline); // only for testing
      addSnackbar({
        severity: "warning",
        message: t("offlineWarning"),
        autoHideDuration: undefined,
      });
    }

    if (isOnline && recentlyOffline) {
      setRecentlyOffline(false);
      console.log("recentlyOffline:" + recentlyOffline); // only for testing
      addSnackbar({
        severity: "warning",
        message: t("onlineWarning"),
        autoHideDuration: 3000,
      });
      updateSnackbar({
        severity: "warning",
        message: t("offlineWarning"),
        autoHideDuration: 1,
      });
    }
    console.log(snackbarsErrorWarning);
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
