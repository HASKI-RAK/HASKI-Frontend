import { StateCreator } from 'zustand'
import { LearningElementRecommendation, LearningElementRecommendationReturn } from '@core'
import { fetchLearningElementRecommendation } from '@services'
import { StoreState } from '@store'
import { resetters } from '../../Zustand/Store'

// todo doc
export type LearningElementRecommendationSlice = {
  _learningElementRecommendation: Record<string, LearningElementRecommendation>
  clearLearningElementRecommendationCache: (courseId?: string, topicId?: string) => void
  getLearningElementRecommendation: LearningElementRecommendationReturn
}

// todo docs
export const createLearningElementRecommendationSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningElementRecommendationSlice
> = (set, get) => {
  resetters.push(() => set({ _learningElementRecommendation: {} }))
  return {
    _learningElementRecommendation: {},
    clearLearningElementRecommendationCache: (courseId?: string, topicId?: string) => {
      set({
        _learningElementRecommendation: {
          ...get()._learningElementRecommendation,
          [`${courseId}-${topicId}`]: []
        }
      })
    },
    getLearningElementRecommendation: async (userId: number, courseId: string, topicId: string) => {
      const key = `${courseId}-${topicId}`
      const cached = get()._learningElementRecommendation[key]

      if (!cached || cached.length === 0) {
        const learningElementRecommendation = await fetchLearningElementRecommendation(userId, courseId, topicId)
        set({
          _learningElementRecommendation: {
            ...get()._learningElementRecommendation,
            [key]: learningElementRecommendation
          }
        })
        return learningElementRecommendation
      } else return cached
    }
  }
}
