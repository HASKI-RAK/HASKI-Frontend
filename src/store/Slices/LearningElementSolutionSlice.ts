import { StateCreator } from 'zustand'
import { LearningElementSolution, LearningElementSolutionReturn } from '@core'
import { StoreState } from '@store'
import { fetchLearningElementSolution } from '@services'

type LearningElementSolutionSlice = {
    _learningElementSolution: Record<string, LearningElementSolution>
    getLearningElementSolution: LearningElementSolutionReturn
    setLearningElementSolution?: (
        learningElementId: number,
        solutionLmsId: number
    ) => Promise<LearningElementSolution>
}

export default LearningElementSolutionSlice

export const createLearningElementSolutionSlice: StateCreator<StoreState, [], [], LearningElementSolutionSlice> = (set, get) => {
    return {
        _learningElementSolution: {},
        getLearningElementSolution: async (learningElementId : number) => {
            const cached = get()._learningElementSolution[`${learningElementId}`]

            if (!cached) {
                const learningElementSolution = await fetchLearningElementSolution(learningElementId)
                set({
                    _learningElementSolution: {
                        ...get()._learningElementSolution,
                        [`${learningElementId}`]: learningElementSolution
                    }
                })
                return learningElementSolution
            } else return cached
        }
    }
}