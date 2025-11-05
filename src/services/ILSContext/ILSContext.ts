import { createContext } from 'react'

export type ILSContextType = {
  sensingPerception: boolean
  intuitivePerception: boolean
  verbalInput: boolean
  visualInput: boolean
  activeProcessing: boolean
  reflectiveProcessing: boolean
  sequentialUnderstanding: boolean
  globalUnderstanding: boolean
}

const ILSContext = createContext<ILSContextType>({
  sensingPerception: false,
  intuitivePerception: false,
  verbalInput: false,
  visualInput: false,
  activeProcessing: false,
  reflectiveProcessing: false,
  sequentialUnderstanding: false,
  globalUnderstanding: false
})
export default ILSContext
