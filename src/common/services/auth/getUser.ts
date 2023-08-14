import { User } from '@core'
import { getData } from '../RequestResponse'

/**
 *
 * @returns {@link User} object
 */
export const getUser = async (): Promise<User> => {
  const response = await fetch(process.env.BACKEND + `/lms/user_from_cookie`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<User>(response)
}
