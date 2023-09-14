import StudentLearningElement from '../StudentLearningElement/StudentLearningElement'

type LearningElement = {
  id: number
  lms_id: number
  activity_type: string
  classification: string
  name: string
  university: string
  created_by: string
  created_at: string
  last_updated: string
  student_learning_element: StudentLearningElement
}

export default LearningElement
