import { StateCreator } from 'zustand'
import { LearningElementRecommendation, LearningElementRecommendationReturn } from '@core'
import { fetchLearningElementRecommendation } from '@services'
import { StoreState } from '@store'
import { resetters } from '../../Zustand/Store'

// todo doc
export type LearningElementRecommendationSlice = {
  _learningElementRecommendationCache: Record<string, LearningElementRecommendation>
  clearLearningElementRecommendationCache: (courseId?: string, topicId?: string) => void // todo maybe not optional
  getLearningElementRecommendation: LearningElementRecommendationReturn
}

// todo docs
export const createLearningElementRecommendationSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningElementRecommendationSlice
> = (set, get) => {
  resetters.push(() => set({ _learningElementRecommendationCache: {} }))
  return {
    _learningElementRecommendationCache: {},
    clearLearningElementRecommendationCache: (courseId?: string, topicId?: string) => {
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
