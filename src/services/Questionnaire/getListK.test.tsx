//Tests fail with shortened Path
import { getConfig } from '@shared'
import { getListK } from './getListK'

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
  it('should return the course when the response is successful', async () => {
    const expectedData = {
      course: 'dude where is my car',
      att: 1,
      characteristic_id: 1,
      cogn_str: 1,
      con: 1,
      crit_rev: 1,
      eff: 1,
      elab: 1,
      ext_res_mng_str: 1,
      goal_plan: 1,
      id: 1,
      int_res_mng_str: 1,
      lit_res: 1,
      lrn_env: 1,
      lrn_w_cls: 1,
      metacogn_str: 1,
      org: 1,
      reg: 1,
      rep: 1,
      time: 1
    }
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    const result = await getListK(1, 1, 1)

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/user/1/1/student/1/learningStrategy`, {
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

    await expect(getListK()).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponse)

    await expect(getListK()).rejects.toThrow('')
  })
})
