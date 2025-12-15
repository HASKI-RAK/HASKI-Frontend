import { getConfig } from '@shared'
import { deleteCourse } from './deleteCourse'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      delete: () => 'application/json'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0035] deleteCourse has expected behaviour', () => {
  it('should return message string if successful', async () => {
    const inputData = ['deletion successful']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await deleteCourse(1, 1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/lms/course/1/1`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
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

    await expect(deleteCourse(1, 1)).rejects.toThrow('')
  })
})
