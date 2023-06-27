/**
 * The response of a request
 *
 * @property status - The status code of the response
 * @property ok - This is true if the response status code is between 200 and 299
 * @property error - If ok is false, this is the error of the response
 * @property message - If you expect a message from the response, this is the message of the response
 * @property json - If you expect a json from the response, this is the json of the response
 */
export type RequestResponse = {
  status: number
  ok: boolean
  error?: string
  message?: string
  json?: unknown
}

/**
 * The response of a request if the response is an error
 * @remarks
 * 📑 ErrorRequestResponse must be compliant with the Backend.
 * If the backend changes, this type must be changed too.
 * 
 * @property  status - The status code of the response
 * @property  ok - This is false if the response status code is not between 200 and 299
 * @property  error - This is the error class name of the response (e.g. "StateNotMatchingException") from the backend
 * @property  message - This is the message of the error. Used for detailed error messages.
 */
type ErrorRequestResponse = {
  status: number
  ok: false
  error: string
  message: string
}

type Response = {
  headers: {
    get: (key: string) => string | null
  }
  ok: boolean
  json: () => Promise<unknown>
  text: () => Promise<string>
}

/**
 * Get the data of a response
 * @remarks
 * Specify a type T for the return data.
 * If the response is not ok, it throws an error
 *
 * @param response - The response of an api fetch request
 * @param contentType - The content type of the response. Default is 'application/json'. Another example is 'text/html'.
 * @returns The data of type T of the response
 */
export const getData = async <T,>(response: Response, contentType = 'application/json'): Promise<T> => {
  if (response.headers.get('Content-Type')?.includes(contentType)) {
    if (!response.ok) {
      // If response has json, it is an error response
      const data: ErrorRequestResponse = await response.json() as ErrorRequestResponse
      throw new Error(data.message)
    }
    switch (contentType) {
      case 'application/json':
        return await response.json() as T
      case 'text/plain':
        return await response.text() as unknown as T
      default:
        throw new Error(`Content-Type ${contentType} is not supported`)
    }
  }
  else
    throw new Error(`Content-Type of response is not ${contentType}`)
}