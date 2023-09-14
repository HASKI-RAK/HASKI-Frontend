import { getILS } from './getILS'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('getILS has expected behaviour', () => {
  it('should return negative values when the response is successful (because of dimensions)', async () => {
    const inputData = {
      course: 'dude where is my car',
      characteristic_id: 1,
      id: 1,
      input_dimension: 'vrb',
      input_value: 1,
      perception_dimension: 'int',
      perception_value: 3,
      processing_dimension: 'ref',
      processing_value: 7,
      understanding_dimension: 'glb',
      understanding_value: 3
    }
    const expectedData = {
      course: 'dude where is my car',
      characteristic_id: 1,
      id: 1,
      input_dimension: 'vrb',
      input_value: -1,
      perception_dimension: 'int',
      perception_value: -3,
      processing_dimension: 'ref',
      processing_value: -7,
      understanding_dimension: 'glb',
      understanding_value: -3
    }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(inputData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await getILS(1, 1, 1)

    expect(fetch).toHaveBeenCalledWith(`${process.env.BACKEND}/user/1/1/student/1/learningStyle`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(expectedData)
  })

  it('should return positive values when the response is successful (because of dimensions)', async () => {
    const expectedData = {
      course: 'dude where is my car',
      characteristic_id: 1,
      id: 1,
      input_dimension: 'vis',
      input_value: 1,
      perception_dimension: 'sns',
      perception_value: 3,
      processing_dimension: 'act',
      processing_value: 7,
      understanding_dimension: 'seq',
      understanding_value: 3
    }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await getILS(1, 1, 1)

    expect(fetch).toHaveBeenCalledWith(`${process.env.BACKEND}/user/1/1/student/1/learningStyle`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(expectedData)
  })

  it('should throw a specific error when the response has an error variable', async () => {
    const expectedError = 'Sample error message'
    const expectedMessage = 'Sample error message'

    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: expectedError, message: expectedMessage })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(getILS()).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(getILS()).rejects.toThrow('')
  })
})
