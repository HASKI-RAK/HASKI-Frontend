import { getConfig } from '@shared'
import { fetchDefaultLearningPath } from './fetchDefaultLearningPath'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchDefaultLearningPath has expected behaviour', () => {
  it('should return the disabled classifications when the response is successful', async () => {
    const expectedData = [
      { classification: 'KÜ', position: 1, id: 1, disabled: false, university: 'HS-KE' },
      {
        classification: 'AN',
        position: 2,
        id: 2,
        disabled: true,
        university: 'HS-KE'
      }
    ]
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await fetchDefaultLearningPath({ userId: 1, lmsUserId: 2 })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/2/defaultLearningPath`, {
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

    await expect(fetchDefaultLearningPath({ userId: 1, lmsUserId: 2 })).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(fetchDefaultLearningPath({ userId: 1, lmsUserId: 2 })).rejects.toThrow('')
  })
})
