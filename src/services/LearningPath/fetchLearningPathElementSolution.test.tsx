import { getConfig } from '@shared'
import { fetchLearningPathElementSolution } from './fetchLearningPathElementSolution'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchLearningPathElementSolution has expected behaviour', () => {
  it('should return the learning path element solutions when the response is successful', async () => {
    const expectedData = {
      id: 1,
      learning_element_lms_id: 1,
      solution_lms_id: 4,
      activity_type: 'activity'
    }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const topicId = '2'

    const result = await fetchLearningPathElementSolution(topicId)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/topic/${topicId}/learningPath/solution`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(expectedData)
  })

  it('should throw an error when topicId is missing', async () => {
    await expect(fetchLearningPathElementSolution()).rejects.toThrow('topicId is required')
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

    const topicId = '2'

    await expect(fetchLearningPathElementSolution(topicId)).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const topicId = '2'

    await expect(fetchLearningPathElementSolution(topicId)).rejects.toThrow('')
  })
})
