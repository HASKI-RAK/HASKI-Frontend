import '@testing-library/jest-dom'
import { redirectMoodleLogin } from './redirectMoodleLogin'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ lti_launch_view: 'https://moodle.test' }),
    status: 200
  })
) as jest.Mock

describe('redirectMoodleLogin', () => {
  it('should success', async () => {
    const loginStatus = await redirectMoodleLogin()
    expect(loginStatus.status).toEqual(200)
    expect(loginStatus.message).toEqual('https://moodle.test')
  })
})
