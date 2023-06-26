import { RequestResponse } from './RequestResponse.d'

export const getLoginStatus = async (): Promise<RequestResponse> => {
  const response = await fetch(process.env.BACKEND + `/loginstatus`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (response.status !== 200) {
    // This has to look like the backend error response
    if ('error' in data) {
      throw new Error(data['error'] + ' ' + data['message'])
    } else {
      throw new Error('Unknown error')
    }
  }
  if (data && data.message && data.status)
    return { status: data.status, message: data.message, json: data } as RequestResponse
  else throw new Error('Unknown error during data parsing')
}