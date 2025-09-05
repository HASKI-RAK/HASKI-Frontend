/**
 * Params are optional
 *
 * @param topicId - The topic's id
 * @returns The learning element solutions for a topic learning path
 */

type LearningPathElementSolutionReturn = (topicId?: string) => Promise<LearningPathElementSolution>

type LearningPathElementSolutionItem = {
  id: number
  learning_element_lms_id: number
  activity_type: string
  solution_lms_id: string
}

type LearningPathElementSolution = LearningPathElementSolutionItem[]

export default LearningPathElementSolution
export type { LearningPathElementSolutionReturn }
