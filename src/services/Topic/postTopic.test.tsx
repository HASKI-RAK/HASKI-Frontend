import { getConfig } from '@shared'
import { postTopic } from './postTopic'

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
  name: 'Introduction to Biology',
  lms_id: 12345,
  is_topic: true,
  contains_le: true,
  created_by: 'John Doe',
  created_at: '2024-09-10T09:30:31Z',
  updated_at: '2024-09-10T09:30:31Z',
  university: 'University of Science'
})

describe('postTopic has expected behaviour', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['topic created']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postTopic({ courseId: '1', outputJson: output })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/v2/lms/course/1/topic`, {
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

    await expect(postTopic({ courseId: '1', outputJson: output })).rejects.toThrow('')
  })
})
