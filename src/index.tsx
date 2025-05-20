import 'normalize.css'
import './shared/internationalization'

import { reportWebVitals, sendToAnalytics } from '@common/utils'
import { App } from '@pages'
import { getConfig, logBuffer, setConfig } from '@shared'
import log, { LogLevelDesc } from 'loglevel'
import React from 'react'
import ReactDOM from 'react-dom/client'

// Before the app starts, we need to load the config file which contains the backend URL and other env variables.
fetch('/config/env.' + (process.env.NODE_ENV ?? 'development') + '.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Could not load config: ' + response.statusText)
    }
    return response.json()
  })
  .then((config) => {
    logBuffer(config)
    log.setLevel((config.LOG_LEVEL as LogLevelDesc) || 'error')
    log.debug('Config loaded: ', config)
    setConfig(config)

    log.setLevel((getConfig().LOG_LEVEL as LogLevelDesc) || 'error')
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    reportWebVitals(sendToAnalytics)
  })
  .catch((error) => {
    alert('Error loading config: ' + error)
  })
