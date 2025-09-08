import { StateCreator } from 'zustand'
import { LearningElementRecommendation, LearningElementRecommendationReturn } from '@core'
import { fetchLearningElementRecommendation } from '@services'
import { StoreState } from '@store'
import { resetters } from '../../Zustand/Store'

/**
 * Type for the {@link LearningElementRecommendationSlice} slice of the store.
 */
export type LearningElementRecommendationSlice = {
  /**
   * The cache for current learning element recommendations.
   */
  _learningElementRecommendationCache: Record<string, LearningElementRecommendation>
  /**
   * Clears the learning element recommendation cache for a course and topic.
   */
  clearLearningElementRecommendationCache: (courseId: string, topicId: string) => void
  /**
   * Retrieves the learning element recommendations for a user, course, and topic from the cache or backend.
   */
  getLearningElementRecommendation: LearningElementRecommendationReturn
}

/**
 * Creates a slice of the store to manage learning element recommendations.
 *
 * This slice includes a cache for current learning element recommendations, a method to partially clear the cache,
 * and a method to retrieve learning element recommendations.
 *
 * @category Store
 *
 * @example
 * ```ts
 * export const useStore = create<StoreState>()((...a) => ({
 *  ...createLearningElementRecommendationSlice(...a)
 * }))
 * ```
 */
export const createLearningElementRecommendationSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningElementRecommendationSlice
> = (set, get) => {
  resetters.push(() => set({ _learningElementRecommendationCache: {} }))
  return {
    _learningElementRecommendationCache: {},
    clearLearningElementRecommendationCache: (courseId: string, topicId: string) => {
      set({
        _learningElementRecommendationCache: {
          ...get()._learningElementRecommendationCache,
          [`${courseId}-${topicId}`]: []
        }
      })
    },
    getLearningElementRecommendation: async (userId: number, courseId: string, topicId: string) => {
      const key = `${courseId}-${topicId}`
      const cached = get()._learningElementRecommendationCache[key]

      if (!cached || cached.length === 0) {
        const learningElementRecommendation = await fetchLearningElementRecommendation(userId, courseId, topicId)
        set({
          _learningElementRecommendationCache: {
            ...get()._learningElementRecommendationCache,
            [key]: learningElementRecommendation
          }
        })
        return learningElementRecommendation
      } else return cached
    }
  }
}
