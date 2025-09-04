import { getConfig } from '@shared'
import { fetchLearningElementRecommendation } from './fetchLearningElementRecommendation'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchLearningElementRecommendation', () => {
  it('fetches learning element recommendation data correctly', async () => {
    // todo maybe rename
    const mockData = [
      {
        id: 1,
        lms_id: 1,
        activity_type: 'test',
        classification: 'KÜ',
        name: 'test',
        university: 'test',
        created_at: 'test',
        created_by: 'test',
        last_updated: 'test',
        student_learning_element: {
          id: 1,
          student_id: 1,
          learning_element_id: 1,
          done: false,
          done_at: 'test'
        }
      },
      {
        id: 2,
        lms_id: 2,
        activity_type: 'test',
        classification: 'ÜB',
        name: 'test',
        university: 'test',
        created_at: 'test',
        created_by: 'test',
        last_updated: 'test',
        student_learning_element: {
          id: 2,
          student_id: 1,
          learning_element_id: 2,
          done: false,
          done_at: 'test'
        }
      }
    ]

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await fetchLearningElementRecommendation(1, '1', '1')

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/course/1/topic/1/recommendation`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    expect(result).toEqual(mockData)
  })
})
