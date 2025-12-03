import { getConfig } from '@shared'
import { postLearningElement } from './postLearningElement'

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
  lms_id: 67890,
  activity_type: 'video',
  classification: 'tutorial',
  name: 'Intro to TypeScript',
  created_by: 'Alice Smith',
  created_at: '2024-09-10T09:30:31Z',
  updated_at: '2024-09-10T09:30:31Z',
  university: 'Tech University'
})

describe('postLearningElement has expected behaviour [HASKI-REQ-0093]', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['learning element created']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postLearningElement({ topicId: 1, outputJson: output })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/lms/topic/1/learningElement`, {
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

    await expect(postLearningElement({ topicId: 1, outputJson: output })).rejects.toThrow('')
  })
})
