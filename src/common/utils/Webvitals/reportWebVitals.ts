import { CLSReportCallback } from "web-vitals";

/**
 * Sends statistics to backend enpoint to track vitals of website like responsiveness
 * @param metric the corresponding metric like CLS or FID
 */
export function sendToAnalytics(metric: object): void {
  const body = JSON.stringify(metric);
  const url = "https://example.com/analytics";

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
}
/**
 * Reports the webvitals from library
 * @param onPerfEntry function which gets called for each metric
 */
export function reportWebVitals(onPerfEntry: CLSReportCallback): void {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}
