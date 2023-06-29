import '@testing-library/jest-dom'
import { redirectMoodleLogin } from './redirectMoodleLogin'

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

describe('redirectMoodleLogin', () => {
  it('should success', async () => {
    const loginStatus = await redirectMoodleLogin()
    expect(loginStatus).toEqual({ lti_launch_view: 'https://moodle.test' })
  })
})
