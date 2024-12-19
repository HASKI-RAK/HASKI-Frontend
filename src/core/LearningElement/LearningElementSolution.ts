type LearningElementSolution = {
    learning_element_id: number,
    solution_lms_id: number
}

type LearningElementSolutionReturn = (
    learningElementId: number
) => Promise<LearningElementSolution>

export default LearningElementSolution
export type { LearningElementSolutionReturn }