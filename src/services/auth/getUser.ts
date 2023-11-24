import { User } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/**
 *
 * @returns {@link User} object
 */
export const getUser = async (): Promise<User> => {
  return fetchData<User>(getConfig().BACKEND + `/lms/user_from_cookie`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
