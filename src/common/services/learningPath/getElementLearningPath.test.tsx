import '@testing-library/jest-dom'
import { getElementLearningPath } from '@services'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    status: 200,
    message: 'OK'
  })
) as jest.Mock

describe('getLoginStatus', () => {
  it('should return login status', async () => {
    const topicIndex = 1
    const loginStatus = await getElementLearningPath(topicIndex)
    expect(loginStatus.status).toEqual(200)
  })

  it('should return an error response on network error', async () => {
    const mockError = new Error('Network error')
    window.fetch = jest.fn().mockRejectedValue(mockError)

    const topicIndex = 1
    const response = await getElementLearningPath(topicIndex)

    expect(fetch).toHaveBeenCalled()
    expect(response.status).toEqual(500)
    expect(response.message).toEqual('Some error occurred, while fetching Element learning path.')
    expect(response.data.id).toEqual(2)
    expect(response.data.path).toHaveLength(1)
    expect(response.data.path[0].id).toEqual(1)
  })
})
