import { RequestResponse } from './RequestResponse'

/**
 * Sends a GET request to the backend to redirect the user to the moodle login page
 * @remarks
 * Expects a 200 response. If the response is not 200, an error is thrown.
 * @returns {Promise<RequestResponse>} - The response of the request.
 */
export const redirectMoodleLogin = async (): Promise<RequestResponse> => {
  return fetch(process.env.BACKEND + `/lti_launch_view`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/json'
    }
  })
    .then((response) => response.json())
    .then((response) => {
      return {
        ok: true,
        status: 200,
        message: response['lti_launch_view']
      }
    })
}
