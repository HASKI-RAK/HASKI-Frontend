import { getConfig } from '@shared'
import { postAddAllStudentsToTopics } from './postAddAllStudentsToTopics'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postAddAllStudentsToTopics has expected behaviour', () => {
  /**
   * Test postAddAllStudentsToTopics
   * [HASKI-REQ-0078] Moodle-Einschreibungen bulkweise übernehmen
   */
  it('should return inputData if succesfull', async () => {
    const inputData = ['course created']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postAddAllStudentsToTopics('1')

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/course/1/topics/allStudents`, {
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

    await expect(postAddAllStudentsToTopics('1')).rejects.toThrow('')
  })
})
