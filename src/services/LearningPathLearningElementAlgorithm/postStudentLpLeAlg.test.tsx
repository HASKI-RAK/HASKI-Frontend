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

describe('postStudentLpLeAlg has expected behaviour', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = {
      algorithm_s_name: 'test'
    }

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const topicId = 1
    const algorithmName = 'test'

    const result = await postStudentLpLeAlg(userId, topicId, algorithmName)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/${userId}/topic/${topicId}/studentAlgorithm`, {
      body: '2',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
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
