import { getConfig } from '@shared'
import { fetchDisabledClassifications } from './fetchDisabledClassifications'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchDisabledClassifications has expected behaviour [HASKI-REQ-0026]', () => {
  it('should return the disabled classifications when the response is successful', async () => {
    const expectedData = ['KÜ', 'EK']
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const university = 'HS-KE'

    const result = await fetchDisabledClassifications(university)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/university/${university}/disabledClassifications`, {
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

    const university = 'HS-KE'

    await expect(fetchDisabledClassifications(university)).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const university = 'HE-KE'

    await expect(fetchDisabledClassifications(university)).rejects.toThrow('')
  })
})
