import { createContext } from 'react'

export type AuthContextType = {
  isAuth: boolean
  setExpire: (unixTimestamp: number) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  logout: () => {
    return
  },
  setExpire: function (unixTimestamp: number) { // eslint-disable-line @typescript-eslint/no-unused-vars
    return
  }
})
export default AuthContext
