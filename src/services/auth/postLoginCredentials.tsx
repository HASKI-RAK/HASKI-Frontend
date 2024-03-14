import { User } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const postLoginCredentials = async (username: number, _password: string): Promise<User> => {
  return fetchData<User>(getConfig().BACKEND + `/login_credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lms_user_id: username })
  })
}
