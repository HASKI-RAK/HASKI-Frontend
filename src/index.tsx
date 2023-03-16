import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@pages";
import { reportWebVitals, sendToAnalytics } from "@utils";
import "./shared/internationalization";
import { SnackbarProvider } from "@components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
reportWebVitals(sendToAnalytics);
