export type LoginResponse = {
  // Unix timestamp
  expiration: number
}

type LoginRequestResponse = {
  status: number
  error?: string
}

export type postLoginParams = {
  nonce?: string
}
export const postLogin = async (params?: postLoginParams): Promise<LoginResponse> => {
  const { nonce = '' } = params || {}
  return fetch(process.env.BACKEND + `/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ nonce: nonce }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json().then((data: LoginResponse & LoginRequestResponse) => {
    if (response.ok) {
      return { expiration: data.expiration }
    }
    throw new Error(data.error)
  }
  ))
}