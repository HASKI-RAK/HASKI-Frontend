import { getConfig } from '@shared'
import { postLearningElementSolution } from './postLearningElementSolution'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      post: () => 'application/json'
    }
  })
) as jest.Mock

const output: string = JSON.stringify({
  solution_lms_id: 2,
  activity_type: 'activity'
})

describe('postLearningElementSolution has expected behaviour', () => {
  it('should return inputData if successfull', async () => {
    const learning_element_lms_id = 1
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(output)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await postLearningElementSolution({
      learningElementLmsId: learning_element_lms_id,
      outputJson: output
    })

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/learningElement/${learning_element_lms_id}/solution`, {
      body: output,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    expect(result).toEqual(output)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(postLearningElementSolution({ learningElementLmsId: 1, outputJson: output })).rejects.toThrow('')
  })
})
