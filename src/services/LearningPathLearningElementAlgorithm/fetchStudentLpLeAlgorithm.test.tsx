import { getConfig } from '@shared'
import { fetchStudentLpLeAlg } from './fetchStudentLpLeAlg'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchStudentLpLeAlg has expected behaviour', () => {
  it('should return the student learning path algorithm when the response is successful', async () => {
    const expectedData = { short_name: 'test' }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const topicId = 1

    const result = await fetchStudentLpLeAlg(userId, topicId)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/${userId}/topic/${topicId}/studentAlgorithm`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(expectedData)
  })

  it('should throw a specific error when the response has an error variable', async () => {
    const expectedError = 'Error: HTTP error undefined'
    const expectedMessage = 'Error: HTTP error undefined'

    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: expectedError, message: expectedMessage })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const topicId = 1

    await expect(fetchStudentLpLeAlg(userId, topicId)).rejects.toThrow(expectedMessage)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const topicId = 1

    await expect(fetchStudentLpLeAlg(userId, topicId)).rejects.toThrow('')
  })
})
