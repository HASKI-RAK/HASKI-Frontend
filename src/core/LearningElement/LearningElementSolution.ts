type LearningElementSolution = {
  learning_element_lms_id: number
  solution_lms_id: number
}

type LearningElementSolutionReturn = (learningElementLmsId: number) => Promise<LearningElementSolution>

export default LearningElementSolution
export type { LearningElementSolutionReturn }
