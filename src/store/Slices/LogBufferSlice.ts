import log, { methodFactory } from 'loglevel'
import { RingBuffer } from 'src/shared/RingBuffer'
import { postBufferContent } from 'src/services/LogContent/postBufferContent'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LogBufferSlice{
    created_at: string
    log_message: string
}

export const createLogBufferSlice:StateCreator<PersistedStoreState, [],[],LogBufferSlice>= (set) => {
    resetters.push(()=>set({created_at:'', log_message:'' }))
    const GlobalRingBuffer = new RingBuffer<[string,string]>(100)
    
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
        }
    }
    return{
        created_at: new Date().toDateString(),
        log_message: 'random bs'
    }
}

