import log, { methodFactory } from 'loglevel'
import { RingBuffer } from 'src/shared/RingBuffer'
import { postBufferContent } from 'src/services/LogContent/postBufferContent'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LogBufferSlice {
  timestamp: string
  content: string
  _buffer: Record<string, string>
  ringBufferContent: RingBuffer<[string, string]>
  setRingBufferContent: (rbcontent?: RingBuffer<[string, string]>) => void
}

export const createLogBufferSlice: StateCreator<PersistedStoreState, [], [], LogBufferSlice> = (set) => {
  resetters.push(() =>
    set({ _buffer: {}, timestamp: '', content: '', ringBufferContent: new RingBuffer<['string', 'string']>(100) })
  )
  return {
    _buffer: {},
    ringBufferContent: new RingBuffer<['string', 'string']>(100),
    setRingBufferContent: (rbcontent?: RingBuffer<[string, string]>) => {
      set({ ringBufferContent: rbcontent })
    },
    timestamp: '',
    content: ''
  }
}

//old logbuffer
/*
export const logBuffer = () => {
  //init ringbuffer mit jeweils 100 timestamp und 100 message
  const GlobalRingBuffer = new RingBuffer<[string, string]>(100)
  // wenn ringbuffer im localstorage nicht null
  if (localStorage.getItem('ringBufferContent') !== null) {
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
      GlobalRingBuffer.add([new Date().toUTCString(), message])
      localStorage.setItem('ringBufferContent', JSON.stringify(GlobalRingBuffer))
    }
  }
}*/
