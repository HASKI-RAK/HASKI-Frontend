/**
 * @prop courseId - The id of the course
 * @prop studentId - The id of the student
 * @prop learningElementId - The id of the learning element
 * @interface
 * @category Core
 */
type LearningPathElementStatusReturn = (
  courseId?: string,
  studentId?: number,
  learningElementId?: number
) => Promise<LearningPathElementStatus[]>

/**
 * @prop cmid - The id of the learning element (equals learning_element_id)
 * @prop state - The status of the learning element (0 = not done, 1 = done)
 * @prop timecompleted - The timestamp of when the learning element was completed in unix time
 * @interface
 * @category Core
 */
type LearningPathElementStatus = {
  cmid: number //learning_element_id
  state: number //status of the learning element (0 = not done, 1 = done)
  timecompleted: number //timestamp of when the learning element was completed in unix time
}

export default LearningPathElementStatus
export type { LearningPathElementStatusReturn }
