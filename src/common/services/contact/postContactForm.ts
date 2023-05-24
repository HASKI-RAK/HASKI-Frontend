export interface FormDataType {
  reportType: string
  reportTopic: string
  description: string
}

export type PostContactFormResponse = {
  status: number
  message: string
}
export type PostContactFormParams = {
  nonce?: string
  responseBody?: FormDataType
}
/**
 * Send the input of the contact form to the backend.
 * @returns PostContactFormResponse
 */
export const postContactForm = async (responseBody?: FormDataType): Promise<PostContactFormResponse> => {
  return fetch(process.env.BACKEND + `/contactform`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ responseBody }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return {
      status: response.status,
      message: response.statusText
    }
  })
}
