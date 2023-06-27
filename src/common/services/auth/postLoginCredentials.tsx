import { RequestResponse } from './RequestResponse'

export const postLoginCredentials = async (): Promise<RequestResponse> => {
  return fetch(process.env.BACKEND + `/login_credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return {
      ok: response.ok,
      status: response.status,
      message: response.statusText
    }
  })
}
