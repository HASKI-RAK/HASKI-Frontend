import { getConfig } from '@shared'
import { fetchLearningPathElementSpecificStatus } from './fetchLearningPathElementSpecificStatus'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchLearningPathElementStatus has expected behaviour', () => {
  it('should return the learning path element status when the response is successful', async () => {
    const expectedData = { cmid: 1, status: 0, timecompleted: 0 }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const studentId = 1
    const courseId = '2'
    const learningElementId = 3

    const result = await fetchLearningPathElementSpecificStatus(courseId, studentId, learningElementId)

    expect(fetch).toHaveBeenCalledWith(
      `${
        getConfig().BACKEND
      }/lms/course/${courseId}/student/${studentId}/learningElementId/${learningElementId}/activitystatus`,
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

  it('should throw an error when course_id or studentId are missing', async () => {
    const studentId = 1
    const courseId = undefined // Set to null to simulate a missing value
    const learningElementId = 3

    await expect(fetchLearningPathElementSpecificStatus(courseId, studentId, learningElementId)).rejects.toThrow(
      'course_id, studentId and learningElementId are required'
    )
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

    const studentId = 1
    const courseId = '2'
    const learningElementId = 3

    await expect(fetchLearningPathElementSpecificStatus(courseId, studentId, learningElementId)).rejects.toThrow(
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

    const studentId = 1
    const courseId = '2'
    const learningElementId = 3

    await expect(fetchLearningPathElementSpecificStatus(courseId, studentId, learningElementId)).rejects.toThrow('')
  })
})
