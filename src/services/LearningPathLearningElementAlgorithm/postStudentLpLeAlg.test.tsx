import { getConfig } from '@shared'
import { postStudentLpLeAlg } from './postStudentLpLeAlg'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postStudentLpLeAlg has expected behaviour [HASKI-REQ-0041]', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = {
      algorithm_short_name: 'test'
    }

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const lmsUserId = 1
    const courseId = '1'
    const topicId = 1
    const algorithmName = 'test'

    const result = await postStudentLpLeAlg(userId, lmsUserId, courseId, topicId, algorithmName)

    expect(fetch).toHaveBeenCalledWith(
      `${getConfig().BACKEND}/user/${userId}/${lmsUserId}/course/${courseId}/topic/${topicId}/studentAlgorithm`,
      {
        body: JSON.stringify({ algorithm_short_name: algorithmName }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    expect(result).toEqual(inputData)
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
    const algorithmName = 'test'

    await expect(postStudentLpLeAlg(userId, topicId, algorithmName)).rejects.toThrow('')
  })
})
