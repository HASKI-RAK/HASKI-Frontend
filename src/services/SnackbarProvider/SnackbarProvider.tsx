import { memo } from 'react'

import { SnackbarContainer } from '@components'
import { SnackbarContext, SnackbarContextType } from '@services'

import { useSnackbarProvider as _useSnackbarProvider } from './SnackbarProvider.hooks'


/**
 * @prop children - The child element of the provider.
 * @prop useSnackbarProvider - The hook supplying the snackbar provider logic.
 * @category Services
 * @interface
 */
type SnackbarProviderProps = {
  children: React.ReactNode
  useSnackbarProvider?: () => SnackbarContextType
}

/**
 * SnackbarProvider component.
 *
 * @param props - The props of the component.
 *
 * @remarks
 * SnackbarProvider presents a provider for the snackbars.
 * It can be used as a component by wrapping the application to provide snackbars on top of every page.
 *
 * @category Services
 */
const SnackbarProvider = ({ useSnackbarProvider = _useSnackbarProvider, ...props }: SnackbarProviderProps) => (
  <SnackbarContext.Provider value={useSnackbarProvider()}>
    <SnackbarContainer />
    {props.children}
  </SnackbarContext.Provider>
)

export default memo(SnackbarProvider)
