import { DefaultButton as Button } from "@common/components";
import { useSnackbarContext } from "@services";
import React, { useState, useEffect, useCallback } from "react";
import { SnackbarProps } from "../SnackbarEntry/SnackbarEntry";

export const SnackbarTest = () => {
  const { addSnackbar, updateSnackbar } = useSnackbarContext();

  // Online state
  const [isOffline, setIsOffline] = useState(navigator.onLine);
  const [offlineSnackbarClosedRecently, setOfflineSnackbarClosedRecently] =
    useState(false);

  const [autoHideDuration, setAutoHideDuration] = useState<
    undefined | number
  >();

  const snackbar = {
    severity: "warning",
    message: "You are currently offline", // TODO: Add translation
    autoHideDuration: autoHideDuration,
  } as SnackbarProps;

  const handle = useCallback(() => {
    setAutoHideDuration(1);
    updateSnackbar(snackbar);
    console.log(snackbar.autoHideDuration);
  }, []);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOffline(navigator.onLine);

      if (isOffline) {
        addSnackbar(snackbar);
        // setAutoHideDuration(1);
        updateSnackbar(snackbar); // TODO: This does not work
        console.log(snackbar.autoHideDuration);
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
      updateSnackbar(snackbar);
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

  // const [test, setTest] = useState<undefined | number>(undefined);

  const sn = {
    severity: "error",
    message: "testing",
    autoHideDuration: 0,
    // open: open,
  } as SnackbarProps;

  return (
    <>
      <Button onClick={() => addSnackbar(snackbar)}>Test</Button>
      <Button onClick={() => setAutoHideDuration(1)}>Test2</Button>
      <Button onClick={() => updateSnackbar(snackbar)}>Test2.5</Button>
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
