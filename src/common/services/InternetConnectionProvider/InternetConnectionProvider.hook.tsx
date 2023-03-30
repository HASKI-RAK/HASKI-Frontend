import { useState, useEffect, useMemo } from "react";

const useInternetConnectionProvider = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineSnackbarClosedRecently, setOfflineSnackbarClosedRecently] =
    useState(false); // -> Das muss aber woanders hin oder?

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOffline(!navigator.onLine);
      navigator.onLine && setOfflineSnackbarClosedRecently(true);
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

  /*return useMemo(
    () => ({
      isOffline,
      setIsOffline,
      offlineSnackbarClosedRecently,
      setOfflineSnackbarClosedRecently,
    }),
    [isOffline, offlineSnackbarClosedRecently]*/
};

export { useInternetConnectionProvider };
