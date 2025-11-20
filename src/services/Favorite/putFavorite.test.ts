import '@testing-library/jest-dom'
import { putFavorite } from './putFavorite'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve<Response>,
    ok: true,
    status: 200,
    message: 'OK',
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('putFavorite', () => {
  const testData = {
    is_favorite: true,
    student_id: 1,
    learning_element_id: 1
  }
  it('should return put success with default params', async () => {
    const requestStatus = await putFavorite(testData.is_favorite, testData.student_id, testData.learning_element_id)
    expect(requestStatus).toEqual(Promise.resolve<Response>)
    expect(requestStatus.status).toEqual(undefined)
  })
})
