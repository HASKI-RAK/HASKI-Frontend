import '@testing-library/jest-dom'
import { postLogin, LoginResponse } from './postLogin'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve<LoginResponse>({ expiration: 0 }),
    status: 200,
    message: 'OK'
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
