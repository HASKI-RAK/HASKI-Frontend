import { createContext } from 'react'

export type ILSContextType = {
  perceptionDimension: string
  inputDimension: string
  processingDimension: string
  understandingDimension: string
}

const ILSContext = createContext<ILSContextType>({
  perceptionDimension: '',
  inputDimension: '',
  processingDimension: '',
  understandingDimension: ''
})
export default ILSContext
