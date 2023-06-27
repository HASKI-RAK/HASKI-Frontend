import '@testing-library/jest-dom'
import { getLogout } from './getLogout'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
    status: 200,
    message: 'OK',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
) as jest.Mock

describe('getLoginStatus', () => {
  it('should return logout success', async () => {
    await getLogout().then(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })
})
