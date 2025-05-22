import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export type LoginResponse = {
  // Unix timestamp
  expiration: number
}
export type postLoginParams = {
  nonce?: string
}
export const postLogin = async (params?: postLoginParams): Promise<LoginResponse> => {
  const { nonce = '' } = params || {}

  return fetchData<LoginResponse>(getConfig().BACKEND + `/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ nonce: nonce }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
