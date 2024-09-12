import { getConfig } from '@shared'
import { fetchStudentRatings } from './fetchStudentRatings'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchStudentRatings', () => {
  it('fetches correctly', async () => {
    const inputData = {
      student_id: 1,
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

    const result = await fetchStudentRatings(1, 1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/student/rating`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    expect(result).toEqual(inputData)
  })

  it('should throw error on missing variable', async () => {
    expect(fetchStudentRatings(1)).rejects.toThrow('userId and studentId are required')
  })
})
