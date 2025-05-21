import { AuthContext, AuthContextType } from '@services'

import { useAuthProvider as _useAuthProvider } from './AuthProvider.hooks'


type AuthProviderProps = {
  children: React.ReactNode
  useAuthProvider?: () => AuthContextType
}

const AuthProvider = ({ useAuthProvider = _useAuthProvider, ...props }: AuthProviderProps) => (
  <AuthContext.Provider value={useAuthProvider()}>{props.children}</AuthContext.Provider>
)

export default AuthProvider
