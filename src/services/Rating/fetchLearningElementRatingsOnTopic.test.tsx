import { getConfig } from '@shared'
import { fetchLearningElementRatingsOnTopic } from './fetchLearningElementRatingsOnTopic'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchLearningElementRatingsOnTopic', () => {
  it('', async () => {
    const inputData = {
      learning_element_id: 1,
      topic_id: 1,
      rating_value: 1000,
      rating_deviation: 100,
      timestamp: new Date()
    }

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await fetchLearningElementRatingsOnTopic(1, 1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/topic/1/learningElement/1/rating`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    expect(result).toEqual(inputData)
  })

  it('should throw errpr on missing variable', async () => {
    expect(fetchLearningElementRatingsOnTopic(1)).rejects.toThrow('learningElementId and topicId are required')
  })
})
