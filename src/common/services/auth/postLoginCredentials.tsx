import { RequestResponse } from './RequestResponse.d'

export const postLoginCredentials = async (): Promise<RequestResponse> => {
  return fetch(process.env.BACKEND + `/login_credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return {
      status: response.status,
      message: response.statusText
    }
  }) as Promise<RequestResponse>
}
