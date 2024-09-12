import { getConfig } from '@shared'
import { fetchRemoteCourses } from './fetchRemoteCourses'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchCourses has expected behaviour', () => {
  it('should return the course when the response is successful', async () => {
    const expectedData = [
      {
        enddate: 1702166400,
        fullname: 'Kurs-1',
        id: 2,
        shortname: 'kurs',
        startdate: 1670630400,
        timecreated: 1670578503,
        timemodified: 1670578503
      },
      {
        enddate: 1718406000,
        fullname: 'Kurs-2',
        id: 3,
        shortname: 'ku2',
        startdate: 1686870000,
        timecreated: 1686830366,
        timemodified: 1692021711
      }
    ]

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await fetchRemoteCourses()

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/lms/remote/courses`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(expectedData)
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

    await expect(fetchRemoteCourses()).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(fetchRemoteCourses()).rejects.toThrow('')
  })
})
