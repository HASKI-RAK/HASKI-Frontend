import log from 'loglevel'
import { RingBuffer } from './RingBuffer'
import { postBufferContent } from 'src/services/LogContent/postBufferContent'
import { bufferContent } from 'src/services/LogContent/postBufferContent'

/**
 * This function is used to log all the messages in the console and also store them in a ring buffer.
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
      //send buffer if in production or if send is true in development
      if (isProd || sendLogs) {
        if (methodName === 'error') {
          const bufferBody: bufferContent = {
            timestamp: JSON.stringify(date),
            content: message
          }
          //get userid from localStorage
          const persistedStorage = JSON.parse(localStorage.getItem('persisted_storage') || '{}')
          //send buffer content to backend
          //persistedStorage.state._user.id
          postBufferContent(bufferBody, persistedStorage.state._user.id).catch(() => {
            console.log('buffer failed to send')
          })
          //remove buffer content
          GlobalRingBuffer.clear()
        }
      }

      localStorage.setItem('ringBufferContent', JSON.stringify(GlobalRingBuffer))
    }
  }
}
