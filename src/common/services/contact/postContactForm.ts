export interface FormDataType {
  reporttype: string
  reporttopic: string
  description: string
}

export type postContactFormResponse = {
  status: number
  message: string
}
export type postContactFormParams = {
  nonce?: string
  responseBody?: FormDataType
}
export const postContactFormInputs = async (responseBody?: FormDataType): Promise<postContactFormResponse> => {
  return fetch(process.env.BACKEND + `/contactform_inputs`, {
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
  }) as Promise<postContactFormResponse>
}
