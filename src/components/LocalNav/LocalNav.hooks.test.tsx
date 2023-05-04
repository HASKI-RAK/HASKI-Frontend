import { renderHook } from '@testing-library/react-hooks'
import { useLearningPath } from './LocalNav.hooks'
import { getElementLearningPath } from '@services'

jest.mock('@services', () => ({
  getCourseTopics: jest.fn(),
  getElementLearningPath: jest.fn()
}))

describe('useLearningPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle error', async () => {
    // mock getElementLearningPath to throw an error
    ;(getElementLearningPath as jest.MockedFunction<typeof getElementLearningPath>).mockRejectedValue(
      new Error('some error')
    )

    const { result, waitForNextUpdate } = renderHook(() => useLearningPath())

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.topics).toEqual([])
    expect(result.current.learningPath).toEqual([])
  })
})
