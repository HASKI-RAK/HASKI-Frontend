import { getConfig } from '@shared'
import { postAddAllStudentsToCourse } from './postAddAllStudentsToCourse'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postAddAllStudentsToCourse has expected behaviour [HASKI-REQ-0078]', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['students added']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postAddAllStudentsToCourse(1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/course/1/allStudents`, {
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

    await expect(postAddAllStudentsToCourse(1)).rejects.toThrow('')
  })
})
