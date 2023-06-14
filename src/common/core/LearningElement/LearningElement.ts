import StudentLearningElement from '../StudentLearningElement/StudentLearningElement'

type LearningElement = {
  id: number
  lmsId: number
  activityType: string
  classification: string
  name: string
  university: string
  createdBy: string
  createdAt: string
  lastUpdated: string
  studentLearningElement: StudentLearningElement
}

export default LearningElement
