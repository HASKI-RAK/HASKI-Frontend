import { User } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const postLoginCredentials = async (username: number, _password: string): Promise<User> => {
  const response = await fetch(getConfig().BACKEND + `/login_credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lms_user_id: username })
  })
  return getData<User>(response)
}
