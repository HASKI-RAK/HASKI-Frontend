type UserSettings = {
  id: number
  pswd: string
  theme: string
  user_id: number
}

type User = {
  id: number
  lms_user_id: number
  name: string
  role: string
  role_id?: number
  settings: UserSettings
  university: string
}
export default User
