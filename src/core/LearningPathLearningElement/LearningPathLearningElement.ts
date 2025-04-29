import LearningElement from '../LearningElement/LearningElement'

type LearningPathLearningElement = {
  id: number
  learning_element_id: number
  learning_path_id: number
  recommended: boolean
  position: number
  learning_element: LearningElement
}

export default LearningPathLearningElement
