//Tests fail with shortened Path
import { getConfig } from '@shared'
import { postCalculateLearningPathILS } from './postCalculateLearningPathILS'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postCalculateLearningPathILS tests', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['1', '1']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postCalculateLearningPathILS(1, 1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/1/learningPath`, {
      body: '{}',
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

    await expect(postCalculateLearningPathILS(1, 1)).rejects.toThrow('')
  })
})
