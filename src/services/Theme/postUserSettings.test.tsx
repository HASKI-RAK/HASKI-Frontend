import { getConfig } from '@shared'
import { postUserSettings } from './postUserSettings'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

const output = JSON.stringify({
  theme: 'DarkTheme'
})

describe('postUserSettings has expected behaviour', () => {
  it('should return inputData if successful, without pwsd', async () => {
    const inputData = ['user updated']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postUserSettings('DarkTheme', 2, 2)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/2/2/settings`, {
      body: output,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    expect(result).toEqual(inputData)
  })

  it('should return inputData if successful, with pwsd', async () => {
    const inputData = ['user updated']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postUserSettings('DarkTheme', 2, 2, 'password')

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/2/2/settings`, {
      body: JSON.stringify({
        theme: 'DarkTheme',
        pswd: 'password'
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    expect(result).toEqual(inputData)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(postUserSettings('DarkTheme', 2, 2)).rejects.toThrow('')
  })
})
