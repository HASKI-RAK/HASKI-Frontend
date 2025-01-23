import { User } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postUserSettings = async (
  theme: string,
  user_id: number,
  lms_user_id: number,
  pswd?: string
): Promise<User> => {
  return fetchData<User>(getConfig().BACKEND + `/user/${user_id}/${lms_user_id}/settings`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      theme: theme,
      ...(pswd && { pswd: pswd })
    })
  })
}
