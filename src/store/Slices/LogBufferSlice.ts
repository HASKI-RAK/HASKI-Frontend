import log, { methodFactory } from 'loglevel'
import { RingBuffer } from 'src/shared/RingBuffer'
import { postBufferContent } from 'src/services/LogContent/postBufferContent'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LogBufferSlice{
    created_at: number
    log_message: string
}

export const createLogBufferSlice:StateCreator<PersistedStoreState, [],[],LogBufferSlice>= (set) => {
    resetters.push(()=>set({created_at:0}))
    const GlobalRingBuffer = new RingBuffer<[string,string]>(100)
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
        return(message)=>{
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
    return{
        created_at:0,
        log_message:0
    }
}
