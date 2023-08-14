import { createContext } from 'react'

export type AuthContextType = {
  isAuth: boolean
  setExpire: (unixTimestamp: number) => void
  logout: () => Promise<void>
}
const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setExpire: () => {
    return
  },
  logout: async () => {
    return
  }
})
export default AuthContext
