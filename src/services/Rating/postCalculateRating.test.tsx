//Tests fail with shortened Path
import { getConfig } from '@shared'
import { postCalculateRating } from './postCalculateRating'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postCalculateRating', () => {
  test('Successful POST request', async () => {
    const returnData = {
      student_rating: {},
      learning_element_rating: {}
    }

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(returnData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postCalculateRating(1, '1', '1', 1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/course/1/topic/1/learningElement/1/rating`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    expect(result).toEqual(returnData)
  })

  it('should throw error', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(postCalculateRating(1, '1', '1', 1)).rejects.toThrow('')
  })
})
