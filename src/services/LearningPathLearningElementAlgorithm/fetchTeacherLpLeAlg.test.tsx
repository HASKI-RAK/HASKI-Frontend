import { getConfig } from '@shared'
import { fetchTeacherLpLeAlg } from './fetchTeacherLpLeAlg'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0041] fetchTeacherLpLeAlg has expected behaviour', () => {
  it('should return the teacher learning path element algorithm when the response is successful', async () => {
    const expectedData = { short_name: 'test' }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const topicId = 1

    const result = await fetchTeacherLpLeAlg(topicId)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/topic/${topicId}/teacherAlgorithm`, {
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

    const topicId = 1

    await expect(fetchTeacherLpLeAlg(topicId)).rejects.toThrow(expectedMessage)
  })

  it('should throw an error unknown when the response is not ok', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const topicId = 1

    await expect(fetchTeacherLpLeAlg(topicId)).rejects.toThrow('')
  })
})
