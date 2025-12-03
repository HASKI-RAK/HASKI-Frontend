import { getConfig } from '@shared'
import { postCalculateLearningPathForAllStudents } from './postCalculateLearningPathForAllStudents'

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

describe('postCalculateLearningPathForAllStudents has expected behaviour [HASKI-REQ-0026]', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['learningpaths for all students calculated']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postCalculateLearningPathForAllStudents({
      userId: 1,
      courseId: '1',
      topicId: 1,
      outputJson: output
    })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/v2/user/1/course/1/topic/1/learningPath`, {
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

    await expect(
      postCalculateLearningPathForAllStudents({ userId: 1, courseId: '1', topicId: 1, outputJson: output })
    ).rejects.toThrow('')
  })
})
