import { RequestResponse } from './RequestResponse.d'

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
        status: 200,
        message: response['lti_launch_view']
      }
    }) as Promise<RequestResponse>
}
