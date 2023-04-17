import '@testing-library/jest-dom'
import { postLogin } from './postLogin'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    status: 200,
    message: 'OK'
  })
) as jest.Mock

describe('postLogin', () => {
  it('should return login success with default params', async () => {
    const loginStatus = await postLogin()
    expect(loginStatus.status).toEqual(200)
  })

  it('should return login success with nonce', async () => {
    const loginStatus = await postLogin({ nonce: 'test' })
    expect(loginStatus.status).toEqual(200)
  })
})
