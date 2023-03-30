import { DefaultButton as Button } from "@common/components";
import { useSnackbarContext } from "@services";
import React, { useState, useEffect } from "react";
import { SnackbarProps } from "../SnackbarEntry/SnackbarEntry";

export const SnackbarTest = () => {
  // Online state
  const [isOffline, setIsOffline] = useState(navigator.onLine);
  const [offlineSnackbarClosedRecently, setOfflineSnackbarClosedRecently] =
    useState(false);

  const [autoHideDuration, setAutoHideDuration] = useState<undefined | number>(
    undefined
  );

  const snackbar = {
    severity: "warning",
    message: "You are currently offline", // TODO: Add translation
    autoHideDuration: autoHideDuration,
  } as SnackbarProps;

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOffline(navigator.onLine);

      if (isOffline) {
        addSnackbar(snackbar);
      }

      if (!isOffline) {
        setAutoHideDuration(1);
        updateSnackbar(snackbar);
        console.log(snackbar.autoHideDuration);
        addSnackbar({
          severity: "warning",
          message: "You are online again", // TODO: Add translation
          autoHideDuration: 3000,
        });
      }

      // if (isOffline) {
      //   addSnackbar(snackbar);
      //   setOfflineSnackbarClosedRecently(false);
      // }
      //
      // if (!isOffline) {
      //   setOfflineSnackbarClosedRecently(true);
      //   setAutoHideDuration(1);
      //   updateSnackbar(snackbar);
      // }
      //
      // if (offlineSnackbarClosedRecently) {
      //   addSnackbar({
      //     severity: "warning",
      //     message: "You are online again",
      //     autoHideDuration: 3000,
      //   });
      // }
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOffline]);

  const { addSnackbar, updateSnackbar } = useSnackbarContext();

  const sn = {
    severity: "error",
    message: "testing",
    autoHideDuration: autoHideDuration,
    // open: open,
  } as SnackbarProps;

  return (
    <>
      <Button onClick={() => addSnackbar(sn)}>Test</Button>
      <Button onClick={() => setAutoHideDuration(1)}>Test2</Button>
      <Button onClick={() => updateSnackbar(sn)}>Test2.5</Button>
      <Button onClick={() => console.log(sn.autoHideDuration)}>Test3</Button>
      <Button
        onClick={() =>
          addSnackbar({
            severity: "error",
            message: "hilfe",
            autoHideDuration: 3000,
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          addSnackbar({
            severity: "warning",
            message: "ja moin",
            autoHideDuration: 3000,
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() => addSnackbar({ severity: "info", message: "ja rip" })}
      >
        Info
      </Button>
      <Button onClick={() => addSnackbar({ message: "Was machsch du?" })}>
        Empty
      </Button>
    </>
  );
};
