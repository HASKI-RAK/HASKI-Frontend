import { getConfig } from '@shared'
//Tests fail with shortened Path
import { fetchLearningPathTopic } from './fetchLearningPathTopic'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchLearningPathElement has expected behaviour', () => {
  it('should return the learning path element when the response is successful', async () => {
    const expectedData = { hello: 'test' }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const lmsUserId = 1
    const studentId = 1
    const courseId = '2'

    const result = await fetchLearningPathTopic(userId, lmsUserId, studentId, courseId)

    expect(fetch).toHaveBeenCalledWith(
      `${getConfig().BACKEND}/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(result).toEqual(expectedData)
  })

  it('should throw an error when course_id is missing', async () => {
    const userId = 1
    const lmsUserId = 1
    const studentId = 1
    const courseId = undefined // Set to null to simulate a missing value

    await expect(fetchLearningPathTopic(userId, lmsUserId, studentId, courseId)).rejects.toThrow('course_id is required')
  })

  it('should throw a specific error when the response has an error variable', async () => {
    const expectedError = 'Sample error message'
    const expectedMessage = 'Sample error message'

    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: expectedError, message: expectedMessage })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const lmsUserId = 1
    const studentId = 1
    const courseId = '2'

    await expect(fetchLearningPathTopic(userId, lmsUserId, studentId, courseId)).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const userId = 1
    const lmsUserId = 1
    const studentId = 1
    const courseId = '2'

    await expect(fetchLearningPathTopic(userId, lmsUserId, studentId, courseId)).rejects.toThrow('')
  })
})
