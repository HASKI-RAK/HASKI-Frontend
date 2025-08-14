import { StateCreator } from 'zustand'
import { LearningElementSolution, LearningElementSolutionReturn } from '@core'
import { fetchLearningElementSolution } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type LearningElementSolutionSlice = {
  _learningElementSolution: Record<string, LearningElementSolution>
  getLearningElementSolution: LearningElementSolutionReturn
  setLearningElementSolution: (learningElementLmsId: number, solutionLmsId: number, activityType?: string) => void
}

export default LearningElementSolutionSlice

export const createLearningElementSolutionSlice: StateCreator<StoreState, [], [], LearningElementSolutionSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _learningElementSolution: {} }))
  return {
    _learningElementSolution: {},
    getLearningElementSolution: async (learningElementLmsId: number) => {
      const cached = get()._learningElementSolution[`${learningElementLmsId}`]

      if (!cached) {
        const learningElementSolution = await fetchLearningElementSolution(learningElementLmsId)
        set({
          _learningElementSolution: {
            ...get()._learningElementSolution,
            [`${learningElementLmsId}`]: learningElementSolution
          }
        })
        return learningElementSolution
      } else return cached
    },
    setLearningElementSolution: async (learningElementLmsId, solutionLmsId, activity_type) => {
      const learningElementSolution = {
        learning_element_lms_id: learningElementLmsId,
        solution_lms_id: solutionLmsId,
        activity_type: activity_type || 'resource'
      }
      set({
        _learningElementSolution: {
          ...get()._learningElementSolution,
          [`${learningElementLmsId}`]: learningElementSolution
        }
      })
    }
  }
}
