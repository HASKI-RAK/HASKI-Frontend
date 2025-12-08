import { getConfig } from '@shared'
import { postCourse } from './postCourse'

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
  lms_id: 54321,
  name: 'Advanced JavaScript',
  start_date: '2024-10-01T12:00:00Z',
  university: 'Global University',
  created_by: 100,
  created_at: '2024-09-10T09:30:31Z'
})

describe('[HASKI-REQ-0035] postCourse has expected behaviour', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['course created']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postCourse({ outputJson: output })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/lms/course`, {
      body: output,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
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

    await expect(postCourse({ outputJson: output })).rejects.toThrow('')
  })
})
