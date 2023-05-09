import { AuthContext, AuthContextType } from '@services'
import { useAuthProvider as _useAuthprovider } from './AuthProvider.hooks'
type AuthProviderProps = {
  children: React.ReactNode
  useAuthProvider?: () => AuthContextType
}
export const AuthProvider = ({ useAuthProvider = _useAuthprovider, ...props }: AuthProviderProps) => (
  <AuthContext.Provider value={useAuthProvider()}>{props.children}</AuthContext.Provider>
)
