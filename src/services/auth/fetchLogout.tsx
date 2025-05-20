import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/**
 * Sends a GET request to the backend to logout the user
 * @remarks
 * The response does not include a body.
 * @returns {Promise<void>} The response of the request.
 */
export const fetchLogout = async (): Promise<void> => {
  return fetchData<undefined>(getConfig().BACKEND + `/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
