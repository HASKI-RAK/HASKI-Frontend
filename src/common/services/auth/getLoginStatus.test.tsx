import '@testing-library/jest-dom'
import { getLoginStatus } from './getLoginStatus'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    status: 200,
    message: 'OK'
  })
) as jest.Mock

describe('getLoginStatus', () => {
  it('should return login status', async () => {
    const loginStatus = await getLoginStatus()
    expect(loginStatus.status).toEqual(200)
  })
})
