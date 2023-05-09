import { AuthContext, AuthContextType } from '@services'
import { useAuthProvider as _useAuthProvider } from './AuthProvider.hooks'

type AuthProviderType = {
  children: React.ReactNode
  useAuthProvider?: () => AuthContextType
}

export const AuthProvider = ({ useAuthProvider = _useAuthProvider, ...props }: AuthProviderType) => (
  <AuthContext.Provider value={useAuthProvider()}>{props.children}</AuthContext.Provider>
)

export default AuthProvider
