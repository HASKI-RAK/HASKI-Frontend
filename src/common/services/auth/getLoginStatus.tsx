import { RequestResponse } from './RequestResponse.d'

export const getLoginStatus = async (): Promise<RequestResponse> => {
  return fetch(process.env.BACKEND + `/loginstatus`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) =>
    response.json().then((data: unknown) => {
      return { status: response.status, message: response.statusText, json: data } satisfies RequestResponse
    })
  )
}
