import { ReactNode } from 'react'
import { ILSContext, ILSContextType } from '@services'
import { useILSProvider as _useILSProvider } from './ILSProvider.hooks'

type ILSProviderProps = {
  children: ReactNode
  useILSProvider?: () => ILSContextType
}

const ILSProvider = ({ children, useILSProvider = _useILSProvider }: ILSProviderProps) => {
  return <ILSContext.Provider value={useILSProvider()}>{children}</ILSContext.Provider>
}

export default ILSProvider
