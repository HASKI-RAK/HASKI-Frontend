import { LearningElement } from '@core'
import { mockServices } from 'jest.setup'
import { useStore } from '@store'

describe('LearningElementRecommendationSlice', () => {
  it('[HASKI-REQ-0072] should fetch, cache and clear recommendations', async () => {
    const { getLearningElementRecommendation } = useStore.getState()

    expect(getLearningElementRecommendation).toBeDefined()
    expect(getLearningElementRecommendation).toBeInstanceOf(Function)
    expect(useStore.getState()._learningElementRecommendationCache).toStrictEqual({})

    const userId = 1
    const courseId = '1'
    const topicId = '1'
    const fetchedResults = await getLearningElementRecommendation(userId, courseId, topicId)

    expect(mockServices.fetchLearningElementRecommendation).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchLearningElementRecommendation).toHaveBeenCalledWith(userId, courseId, topicId)

    const recommendedLearningElements: LearningElement[] = [
      {
        id: 1,
        lms_id: 1,
        activity_type: 'test',
        classification: 'KÜ',
        name: 'test',
        university: 'test',
        created_at: 'test',
        created_by: 'test',
        last_updated: 'test',
        student_learning_element: {
          id: 1,
          student_id: 1,
          learning_element_id: 1,
          done: false,
          done_at: 'test'
        }
      },
      {
        id: 2,
        lms_id: 2,
        activity_type: 'test',
        classification: 'ÜB',
        name: 'test',
        university: 'test',
        created_at: 'test',
        created_by: 'test',
        last_updated: 'test',
        student_learning_element: {
          id: 2,
          student_id: 1,
          learning_element_id: 2,
          done: false,
          done_at: 'test'
        }
      }
    ]

    expect(fetchedResults).toStrictEqual(recommendedLearningElements)
    expect(useStore.getState()._learningElementRecommendationCache['1-1']).toStrictEqual(recommendedLearningElements)

    const cachedResults = await getLearningElementRecommendation(userId, courseId, topicId)

    expect(mockServices.fetchLearningElementRecommendation).toHaveBeenCalledTimes(1)
    expect(cachedResults).toStrictEqual(recommendedLearningElements)
    expect(useStore.getState()._learningElementRecommendationCache['1-1']).toStrictEqual(recommendedLearningElements)

    const { clearLearningElementRecommendationCache } = useStore.getState()

    expect(clearLearningElementRecommendationCache).toBeDefined()
    expect(clearLearningElementRecommendationCache).toBeInstanceOf(Function)

    await clearLearningElementRecommendationCache('1', '1')

    expect(useStore.getState()._learningElementRecommendationCache['1-1']).toStrictEqual([])
  })
})
