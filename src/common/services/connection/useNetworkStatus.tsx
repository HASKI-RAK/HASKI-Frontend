import { useState, useEffect } from "react";

export const useNetworkStatus = () => {
  const [status, setStatus] = useState(navigator.onLine);

  const updateNetworkStatus = () => {
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("offline", updateNetworkStatus);

    window.addEventListener("online", updateNetworkStatus);

    return () => {
      window.removeEventListener("offline", updateNetworkStatus);

      window.removeEventListener("online", updateNetworkStatus);
    };
  }, []);

  return status;
};
