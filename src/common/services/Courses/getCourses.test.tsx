import { getCourses } from './getCourses'

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        ok: true,
        headers: {
            get: () => 'application/json'
        }
    })
) as jest.Mock

describe('getCourses has expected behaviour', () => {
    it('should return the course when the response is successful', async () => {
        const expectedData = { course: 'dude where is my car' }
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

        const result = await getCourses(userId, lmsUserId, studentId)

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.BACKEND}/user/${userId}/${lmsUserId}/student/${studentId}/course`,
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

        await expect(getCourses(userId, lmsUserId, studentId)).rejects.toThrow(
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

        await expect(getCourses(userId, lmsUserId, studentId)).rejects.toThrow('')
    })
})
