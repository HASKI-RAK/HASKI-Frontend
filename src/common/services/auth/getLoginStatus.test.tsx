import '@testing-library/jest-dom'
import { getLoginStatus } from './getLoginStatus'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    status: 200,
    statusText: 'OK'
  })
) as jest.Mock

describe('getLoginStatus', () => {
  it('should return login status', async () => {
    const loginStatus = await getLoginStatus()
    expect(loginStatus.status).toEqual(200)
  })

  it('should throw an error if the response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Error', message: 'Error message' }),
        status: 400,
        statusText: 'Bad Request'
      })
    ) as jest.Mock

    expect(getLoginStatus()).toThrow();
  })
})