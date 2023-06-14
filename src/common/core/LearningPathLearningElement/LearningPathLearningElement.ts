import { LearningElement } from '@core'

type LearningPathLearningElement = {
  id: number
  learningElementId: number
  learningPathId: number
  recommended: boolean
  position: number
  learningElement: LearningElement
}

export default LearningPathLearningElement
