import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@pages";
import { reportWebVitals, sendToAnalytics } from "@utils";
import "./shared/internationalization";


/* courier-prime-regular - latin */
`
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: 'Courier Prime';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/courier-prime-v7-latin-regular.eot'); /* IE9 Compat Modes */
  src: url('../fonts/courier-prime-v7-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../fonts/courier-prime-v7-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/courier-prime-v7-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../fonts/courier-prime-v7-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../fonts/courier-prime-v7-latin-regular.svg#CourierPrime') format('svg'); /* Legacy iOS */
}`

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals(sendToAnalytics);
