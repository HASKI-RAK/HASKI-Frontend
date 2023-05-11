import { RequestResponse } from './RequestResponse.d'

export const getLoginStatus = async (): Promise<RequestResponse> => {
  return fetch(process.env.BACKEND + `/loginstatus`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/json'
    }
  }).then((response) =>
    response.json().then((data) => {
      return { status: response.status, message: response.statusText, json: data } satisfies RequestResponse
    })
  )
}
