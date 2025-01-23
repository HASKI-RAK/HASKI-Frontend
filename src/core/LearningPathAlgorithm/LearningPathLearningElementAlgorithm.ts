type LearningPathLearningElementAlgorithmReturn = () => Promise<LearningPathLearningElementAlgorithmResponse>

type LearningPathLearningElementAlgorithmResponse = {
  algorithms: LearningPathLearningElementAlgorithm[]
}

type LearningPathLearningElementAlgorithm = {
  id: number
  short_name: string
  full_name: string
}

export default LearningPathLearningElementAlgorithm
export type { LearningPathLearningElementAlgorithmReturn, LearningPathLearningElementAlgorithmResponse }
