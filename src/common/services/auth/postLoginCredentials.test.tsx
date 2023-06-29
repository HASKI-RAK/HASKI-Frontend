import '@testing-library/jest-dom'
import { postLoginCredentials } from './postLoginCredentials'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    status: 200,
    ok: true,
    message: 'OK',
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('getLoginStatus', () => {
  it('should return logout success', async () => {
    const loginStatus = await postLoginCredentials()
    expect(loginStatus.status).toEqual(200)
  })
})
