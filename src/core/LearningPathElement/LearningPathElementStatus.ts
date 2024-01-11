type LearningPathElementStatusReturn = (courseId?: string, studentId?: number, learningElementId?: number) => Promise<LearningPathElementStatus[]>
type LearningPathElementSpecificStatusReturn = (courseId?: string, studentId?: number, learningElementId?: number) => Promise<LearningPathElementStatus[]>

type LearningPathElementStatus = {
  cmid: number //learning_element_id
  state: number //status of the learning element (0 = not done, 1 = done)
  timecompleted: number //timestamp of when the learning element was completed in unix time
}

export default LearningPathElementStatus
export type { LearningPathElementStatusReturn, LearningPathElementSpecificStatusReturn }
