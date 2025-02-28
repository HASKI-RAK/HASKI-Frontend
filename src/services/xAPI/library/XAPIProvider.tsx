import { ReactNode, createContext } from 'react'
import { XAPI } from './setupXAPI'

// TODO: Document this context
export const XAPIContext = createContext<XAPI | null>(null)

// TODO: Document this type
export type XAPIProviderProps = {
  children?: ReactNode
  value?: XAPI | null
}

// TODO: Document this component
export const XAPIProvider = ({ children, value }: XAPIProviderProps) => (
  <XAPIContext.Provider value={value ?? null}>{children}</XAPIContext.Provider>
)
