type UserSettings = {
  id: number
  pswd: string
  theme: string
  userId: number
}

type User = {
  id: number
  lmsUserId: number
  name: string
  role: string
  roleId?: number
  settings: UserSettings
  university: string
}
export default User
