/* istanbul ignore file */
import { CLSReportCallback } from 'web-vitals'

import { getConfig } from '@shared'

/**
 * Sends statistics to backend enpoint to track vitals of website like responsiveness
 * @param metric the corresponding metric like CLS or FID
 */
export const sendToAnalytics = (metric: object): void => {
  const body = JSON.stringify(metric)
  const url = getConfig().BACKEND + '/logs/frontend'
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  const headers = {
    type: 'application/json'
  }

  const blob = new Blob([body], headers)
  navigator.sendBeacon(url, blob)
}
/**
 * Reports the webvitals from library
 * @param onPerfEntry function which gets called for each metric
 */
export const reportWebVitals = (onPerfEntry: CLSReportCallback): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}
