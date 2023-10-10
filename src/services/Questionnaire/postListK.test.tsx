//Tests fail with shortened Path
import { postListK } from './postListK'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postListK has expected behaviour', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['question-1', '1']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postListK({ studentId: 1, outputJson: '2' })

    expect(fetch).toHaveBeenCalledWith(`${process.env.BACKEND}/lms/student/1/questionnaire/listk`, {
      body: '2',
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

    await expect(postListK({ studentId: 1, outputJson: '2' })).rejects.toThrow('')
  })
})
