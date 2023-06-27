import { RequestResponse } from './RequestResponse'

/**
 * Sends a GET request to the backend to logout the user
 * @remarks
 * Expects a 204 response. If the response is not 204, an error is thrown.
 * @returns {Promise<RequestResponse>} - The response of the request.
 */
export const getLogout = async (): Promise<RequestResponse> => {
  const response = await fetch(process.env.BACKEND + `/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // First check the expected return status
  if (response.status !== 204) {
    // If response has json, it is an error response
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const data = await response.json()
      throw new Error(data['error'] + ' ' + data['message'])
    }

  }
  return { ok: true, status: response.status }
}
