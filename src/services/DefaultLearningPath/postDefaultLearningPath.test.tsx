import { getConfig } from '@shared'
import { postDefaultLearningPath } from './postDefaultLearningPath'

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
  classification: 'KÜ',
  position: 1,
  disabled: true,
  university: 'HS-KE'
})

describe('postDefaultLearningPath has expected behaviour [HASKI-REQ-0026]', () => {
  it('should return inputData if succesfull', async () => {
    const inputData = ['learning element created']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postDefaultLearningPath({ userId: 1, userLmsId: 2, outputJson: output })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/2/defaultLearningPath`, {
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

    await expect(postDefaultLearningPath({ userId: 1, userLmsId: 2, outputJson: output })).rejects.toThrow('')
  })
})
