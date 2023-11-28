import { User } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

/**
 *
 * @returns {@link User} object
 */
export const fetchUser = async (): Promise<User> => {
  const response = await fetch(getConfig().BACKEND + `/lms/user_from_cookie`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<User>(response)
}
