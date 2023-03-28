import { DefaultButton as Button } from "@common/components";
import { useSnackbar } from "@components";
import React, { useState, useEffect } from "react";

export const SnackbarTest = () => {
  const { addSnackbar } = useSnackbar();
  // Online state
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineSnackbarClosedRecently, setOfflineSnackbarClosedRecently] =
    useState(false);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOffline(!navigator.onLine);

      if (navigator.onLine) {
        setOfflineSnackbarClosedRecently(true);
      }
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

  return (
    <>
      <Button
        onClick={() => addSnackbar({ severity: "error", message: "hilfe" })}
      >
        Error
      </Button>
      <Button
        onClick={() => addSnackbar({ severity: "warning", message: "ja moin" })}
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
