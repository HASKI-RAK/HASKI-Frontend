import log from 'loglevel'
import { RingBuffer } from './RingBuffer'
import { postBufferContent } from '@services'

/**
 * This function is used to log all the messages in the console and also store them in a ring buffer.
 * If production mode is set the logs will be sent to the backend.
 * @category Shared
 */
export const logBuffer = (config: any) => {
  const isProd = process.env.NODE_ENV === 'production'
  //set to '1' if you want to log in the env.dev
  const sendLogs = config.SEND_BUFFER_LOGS === '1'
  const GlobalRingBuffer = new RingBuffer<[string, string]>(100)
  if (localStorage.getItem('ringBufferContent') !== null) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - localStorage.getItem('ringBufferContent') is not null
    const localStorageRingBuffer = JSON.parse(localStorage.getItem('ringBufferContent') ?? '{"buffer":[]}')
    GlobalRingBuffer.fromArray(localStorageRingBuffer.buffer)
  } else {
    localStorage.setItem('ringBufferContent', JSON.stringify(GlobalRingBuffer))
  }
  const originalFactory = log.methodFactory
  log.methodFactory = (methodName, logLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, logLevel, loggerName)
    return (message) => {
      //show only warnings and error in console and log everything else in the GlobalRingBuffer
      if (methodName === 'warn' || methodName === 'error') {
        rawMethod(message)
        // eslint-disable-next-line no-console
        console.log(GlobalRingBuffer)
      }
      const date = new Date().toUTCString()
      GlobalRingBuffer.add([date, message])
      const array = GlobalRingBuffer.toArray()
      //send buffer if in production or if send is true in development
      if (isProd || sendLogs) {
        if (methodName === 'error') {
          //send the last BUFFER_LOG_SIZE messages
          const bufferBody = array.slice(Math.max(array.length - config.BUFFER_LOG_SIZE, 0), array.length)

          //get userid from localStorage
          const storageData = localStorage.getItem('persisted_storage')
          if (storageData) {
            const persistedStorage = JSON.parse(storageData)
            if (!(persistedStorage && persistedStorage.state && persistedStorage.state._user.id)) {
              return
            }

            postBufferContent(bufferBody, persistedStorage.state._user.id)
              .then(() => {
                //remove buffer content
                GlobalRingBuffer.clear()
              })
              .catch(() => {
                //Snackbar cannot be used, log.error will spamm the buffer
                //console.log is used for the developer
                console.log('logbuffer failed to send')
              })
          }
        }
      }

      localStorage.setItem('ringBufferContent', JSON.stringify(GlobalRingBuffer))
    }
  }
}
