import { getConfig } from '@shared'
import { fetchLearningElementRatings } from './fetchLearningElementRatings'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0043] fetchLearningElementRatings', () => {
  it('fetches correctly', async () => {
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

    const result = await fetchLearningElementRatings()

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/learningElement/rating`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    expect(result).toEqual(inputData)
  })
})
