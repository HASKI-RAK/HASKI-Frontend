import log from 'loglevel'
import { RingBuffer } from './RingBuffer'
import { postBufferContent } from 'src/services/LogContent/postBufferContent'
import { bufferContent } from 'src/services/LogContent/postBufferContent'

/**
 * This function is used to log all the messages in the console and also store them in a ring buffer.
 * @category Shared
 */
export const logBuffer = () => {
  //
  const isProd = process.env.NODE_ENV === 'development'
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
      //show only warnings and error in console and log everything else in the GlobalRingBuffer?
      if (methodName === 'warn' || methodName === 'error') {
        rawMethod(message)
        // eslint-disable-next-line no-console
        console.log(GlobalRingBuffer)
      }
      const date = new Date().toUTCString()
      const persistedStorage = JSON.parse(localStorage.getItem('persisted_storage'))
      GlobalRingBuffer.add([date, message])
      if (isProd) {
        if (methodName === 'error') {
          //send buffer content to backend
          const bufferBody: bufferContent = {
            timestamp: JSON.stringify(date),
            content: message
          }

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
