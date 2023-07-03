import { RequestResponse, getData } from '../RequestResponse'

export const postLoginCredentials = async (): Promise<RequestResponse> => {
  const response = await fetch(process.env.BACKEND + `/login_credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<RequestResponse>(response)
}
