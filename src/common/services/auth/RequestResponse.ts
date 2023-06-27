import log from "loglevel"

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
 * Asserts that the response status code is the expected one
 * If not, it throws an error with the message from the response
 *
 * @param response - The response to check
 * @param expectedStatusCode - The expected status code
 * @returns void when the response status code is the expected one or throws an error
 */
export const assertResponseStatusCode = async (response: Response, expectedStatusCode: number): Promise<void> => {
  if (response.status !== expectedStatusCode) {
    // If response has json, it is an error response
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const data: RequestResponse = await response.json()
      log.error(data.error)
      throw new Error(data.message)
    }
  }
}