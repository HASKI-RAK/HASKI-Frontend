import { getConfig } from '@shared'
import { fetchNews } from './fetchNews'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('Test the fetchNews functionalities', () => {
  it('should return the news when the response is successful', async () => {
    const expectedData = { news: 'News in english' }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const languageId = 'en'
    const university = 'HS-AS'

    const result = await fetchNews(languageId, university)

    expect(fetch).toHaveBeenCalledWith(
      `${getConfig().BACKEND}/news?language_id=${languageId}&university=${university}`,
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
    const expectedError = 'Error: HTTP error undefined'
    const expectedMessage = 'Error: HTTP error undefined'

    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: expectedError, message: expectedMessage })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const languageId = 'en'
    const university = 'HS-AS'

    await expect(fetchNews(languageId, university)).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const languageId = 'en'
    const university = 'HS-AS'

    await expect(fetchNews(languageId, university)).rejects.toThrow('')
  })
})
