//Tests fail with shortened Path
import { getLearningPathElement } from './getLearningPathElement'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('getLearningPathElement has expected behaviour', () => {
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
    const topicId = '2'

    const result = await getLearningPathElement(userId, lmsUserId, studentId, courseId, topicId)

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.BACKEND}/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic/${topicId}/learningPath`,
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

  it('should throw an error when course_id or topic_id are missing', async () => {
    const userId = 1
    const lmsUserId = 1
    const studentId = 1
    const courseId = undefined // Set to null to simulate a missing value
    const topicId = '2'

    await expect(getLearningPathElement(userId, lmsUserId, studentId, courseId, topicId)).rejects.toThrow(
      'course_id and topic_id are required'
    )
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
    const topicId = '2'

    await expect(getLearningPathElement(userId, lmsUserId, studentId, courseId, topicId)).rejects.toThrow(
      `${expectedMessage}`
    )
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
    const topicId = '2'

    await expect(getLearningPathElement(userId, lmsUserId, studentId, courseId, topicId)).rejects.toThrow('')
  })
})
