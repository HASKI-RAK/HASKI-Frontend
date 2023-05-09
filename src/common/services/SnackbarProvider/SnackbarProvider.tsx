import { useSnackbarProvider as _useSnackbarProvider } from './SnackbarProvider.hooks'
import { SnackbarContext, SnackbarContextType } from '@services'
import { SnackbarContainer } from '@components'

/**
 * @typedef {Object} SnackbarProviderProps
 * @param {React.ReactNode} children - The child element of the provider.
 * @param {function} useSnackbarProvider - The hook supplying the snackbar provider logic.
 */
type SnackbarProviderProps = {
  children: React.ReactNode
  useSnackbarProvider?: () => SnackbarContextType
}

/**
 * SnackbarProvider presents a provider for the snackbars.
 * It can be used as a component by wrapping the application to provide snackbars on top of every page.
 * @param props - Props containing the child element and the hook for the provider logic.
 * @returns {JSX.Element} - The snackbar provider.
 * @category Services
 */
export const SnackbarProvider = ({ useSnackbarProvider = _useSnackbarProvider, ...props }: SnackbarProviderProps) => (
  <SnackbarContext.Provider value={useSnackbarProvider()}>
    <SnackbarContainer />
    {props.children}
  </SnackbarContext.Provider>
)

export default SnackbarProvider
