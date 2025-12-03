import '@testing-library/jest-dom'
//Tests fail with shortened Path
import { fetchLogout } from './fetchLogout'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
    text: () => Promise.resolve(),
    ok: true,
    status: 200,
    message: 'OK',
    headers: {
      get: () => 'text/plain'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0028] getLoginStatus', () => {
  it('should return logout success', async () => {
    fetchLogout().then(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })
})
