import { createContext, ReactNode } from 'react'
import { XAPI } from './setupXAPI'
// import { XAPIContext } from './XAPIContext'

export const XAPIContext = createContext<XAPI | null>(null)

type XAPIProviderProps = {
  children?: ReactNode
  value?: XAPI | null
}

export const XAPIProvider = ({ children, value }: XAPIProviderProps) => 
    <XAPIContext.Provider value={value ?? null}>{children}</XAPIContext.Provider>



// TODO: Context
// TODO: Type for xAPI Obj to use in other components (including xAPI + other parameters)
// TODO: The type must already include the original xAPI object
// Todo: The data that is used for creating the context must not include the original xapi object

// TODO: Provider
// TODO: Where do i get default data?
// TODO: NO DEFAULT DATA-> MUST CHECK IF UNDEFINED/NULL WHEN USING THE CONTEXT