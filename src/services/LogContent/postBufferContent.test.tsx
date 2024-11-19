//Tests fail with shortened Path
import { getConfig } from '@shared'
import { postBufferContent, BufferContent } from './postBufferContent'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

describe('postBufferContent has expected behaviour', () => {
  it('should return inputData if succesfull', async () => {
    const testData: BufferContent = {
      content: [["text","timestamp"]],
      timestamp: 'some date'
    }
    const inputData = ['question-1', '2']

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postBufferContent(testData, 2)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/2/logbuffer`, {
      body: '{"content":[["text","timestamp"]],"timestamp":"some date"}',
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
    const testFail: BufferContent = { timestamp: '', content: [["",""]] }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(postBufferContent(testFail, 2)).rejects.toThrow('')
  })
})
