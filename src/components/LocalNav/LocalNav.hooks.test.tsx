import { renderHook } from '@testing-library/react-hooks'
import { useLearningPathTopic } from './LocalNav.hooks'

jest.mock('@services', () => ({
  getCourseTopics: jest.fn(),
  getElementLearningPath: jest.fn()
}))

describe('useLearningPath', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle errors', async () => {

    const { result, waitForNextUpdate } = renderHook(() => useLearningPathTopic())

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.topics).toEqual([])
  })
})
