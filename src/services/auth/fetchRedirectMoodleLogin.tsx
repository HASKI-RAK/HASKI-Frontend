import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

export type LTILaunchViewResponse = {
  lti_launch_view: string
}
/**
 * Sends a GET request to the backend to redirect the user to the moodle login page
 * @remarks
 * Expects a 200 response. If the response is not 200, an error is thrown.
 * @returns {Promise<RequestResponse>} - The response of the request.
 */
export const fetchRedirectMoodleLogin = async (): Promise<LTILaunchViewResponse> => {
  return fetchData<LTILaunchViewResponse>(getConfig().BACKEND + `/lti_launch_view`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/json'
    }
  })

  // .then((response) => response.json())
  // .then((response) => {
  //   return {
  //     ok: true,
  //     status: 200,
  //     message: response['lti_launch_view']
  //   }
  // })
}
