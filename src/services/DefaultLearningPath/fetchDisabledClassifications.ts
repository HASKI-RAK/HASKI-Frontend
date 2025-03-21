import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchDisabledClassifications function.
 *
 * @param university - The user's university
 *
 * @remarks
 * Fetches the disabled classifications for the default learning path for the given user.
 *
 * @returns - A string list of classifications that are disabled.
 *
 * @category Services
 */

export const fetchDisabledClassifications = async (university: string) => {
  return fetchData<string[]>(getConfig().BACKEND + `/university/${university}/disabledClassifications`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
