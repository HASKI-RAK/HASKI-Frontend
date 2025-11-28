type UserSettings = {
  id: number // haski_user id
  pswd: string
  theme: string
  user_id: number
}

type User = {
  id: number // student_id
  lms_user_id: number // lms_user_id
  name: string
  role: string
  role_id?: number
  settings: UserSettings
  university: string
}
export default User
