import { User } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 *
 * @returns {@link User} object
 */
export const fetchUser = async (): Promise<User> => {
  return fetchData<User>(getConfig().BACKEND + `/lms/user_from_cookie`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
