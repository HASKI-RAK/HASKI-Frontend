import '@testing-library/jest-dom'
import { getLogout } from './getLogout'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
    text: () => Promise.resolve(),
    ok: true,
    status: 200,
    message: 'OK',
    headers: {
      get: () => 'text/plain',
    }
  })
) as jest.Mock

describe('getLoginStatus', () => {
  it('should return logout success', async () => {
    getLogout().then(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })
})
