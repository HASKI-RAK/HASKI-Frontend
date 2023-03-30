import { createContext } from "react";

export type InternetConnectionContextType = {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
};

const InternetConnectionContext = createContext<InternetConnectionContextType>({
  isOnline: false,
  setIsOnline: function (isOnline: boolean) {
    this.isOnline = isOnline;
  },
});

export default InternetConnectionContext;
