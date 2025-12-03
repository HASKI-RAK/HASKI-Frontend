import { getConfig } from '@shared'
import { postTeacherLpLeAlg } from './postTeacherLpLeAlg'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postTeacherLpLeAlg has expected behaviour [HASKI-REQ-0041]', () => {
  it('should return inputData if successfull', async () => {
    const inputData = ['testAlgorithm']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const lmsUserId = 1
    const topicId = 1
    const algorithmShortName = 'testAlgorithm'

    const result = await postTeacherLpLeAlg(1, 1, 1, algorithmShortName)

    expect(fetch).toHaveBeenCalledWith(
      `${getConfig().BACKEND}/user/${userId}/${lmsUserId}/topic/${topicId}/teacherAlgorithm`,
      {
        body: JSON.stringify({ algorithm_short_name: algorithmShortName }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    expect(result).toEqual(inputData)
  })

  it('should  throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(postTeacherLpLeAlg(1, 1, 1, 'testAlgorithm')).rejects.toThrow('')
  })
})
