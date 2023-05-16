import { RequestResponse } from './RequestResponse.d'

export const getLoginStatus = (): Promise<RequestResponse> => {
  return fetch(process.env.BACKEND + `/loginstatus`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data: unknown) => {
        return { status: response.status, message: response.statusText, json: data } as RequestResponse
      })
    } else {
      return response.json().then((data) => {
        // This has to look like the backend error response
        if (data.hasOwnProperty('error')) {
          throw new Error(data['error'] + ' ' + data['message'])
        } else {
          throw new Error('Unknown error')
        }
      })
    }
  })
}

  // }).then((response) =>
  //   response.json().then((data: unknown) => {
  //     return { status: response.status, message: response.statusText, json: data } satisfies RequestResponse
  //   })