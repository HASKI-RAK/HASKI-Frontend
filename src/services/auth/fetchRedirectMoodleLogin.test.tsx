import '@testing-library/jest-dom'
import { fetchRedirectMoodleLogin } from './fetchRedirectMoodleLogin'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ lti_launch_view: 'https://moodle.test' }),
    status: 200,
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('fetchRedirectMoodleLogin', () => {
  it('should success', async () => {
    const loginStatus = await fetchRedirectMoodleLogin()
    expect(loginStatus).toEqual({ lti_launch_view: 'https://moodle.test' })
  })
})
