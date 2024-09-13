import { getConfig } from '@shared'
import { postLearningPathAlgorithm } from './postLearningPathAlgorithm'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

const output = JSON.stringify({
  algorithm_s_name: 'aco'
})

describe('postLearningPathAlgorithm has expected behaviour', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['teacher algorithm set']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postLearningPathAlgorithm({ userId: 1, topicId: 1, outputJson: output })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/topic/1/teacherAlgorithm`, {
      body: output,
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

    await expect(postLearningPathAlgorithm({ userId: 1, topicId: 1, outputJson: output })).rejects.toThrow('')
  })
})
