import { renderHook } from '@testing-library/react-hooks'
import { useLearningPath } from './LocalNav.hooks'

jest.mock('@services', () => ({
  getCourseTopics: jest.fn(),
  getElementLearningPath: jest.fn()
}))

describe('useLearningPath', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle errors', async () => {

    const { result, waitForNextUpdate } = renderHook(() => useLearningPath())

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.topics).toEqual([])
    expect(result.current.learningPaths).toEqual([])
  })
})
