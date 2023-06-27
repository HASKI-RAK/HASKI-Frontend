import { createContext } from 'react'

export type AuthContextType = {
  isAuth: boolean
  setExpire: (unixTimestamp: number) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setExpire: () => {
    return
  },
  logout: () => {
    return
  }
})
export default AuthContext
