import '@testing-library/jest-dom'
import { postLogin, LoginResponse, LoginRequestResponse } from './postLogin'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve<LoginResponse & LoginRequestResponse>({ expiration: 0, status: 200 }),
    ok: true,
    status: 200,
    message: 'OK',
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('postLogin', () => {
  it('should return login success with default params', async () => {
    const loginStatus = await postLogin()
    expect(loginStatus).toEqual({ expiration: 0 })
  })

  it('should return login success with nonce', async () => {
    const loginStatus = await postLogin({ nonce: 'test' })
    expect(loginStatus).toEqual({ expiration: 0 })
  })
})
