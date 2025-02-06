/**
 * ```mermaid
 * graph TD
 *  index[(index.ts)]
 *  User[User] --> index
 *  ILS[ILS] --> index
 *  ListK[ListK] --> index
 *  LearningElement[LearningElement] --> index
 *  LearningPathTopic[LearningPathTopic] --> index
 *  LearningPathElement[LearningPathElement] --> index
 *  LearningPathLearningElement[LearningPathLearningElement] --> index
 *  StudentLearningElement[StudentLearningElement] --> index
 *  Course[Course] --> index
 *  Topic[Topic] --> index
 *  index --> LearningPathElementReturn[LearningPathElementReturn]
 *  index --> LearningPathTopicReturn[LearningPathTopicReturn]
 *  index --> CourseReturn[CourseReturn]
 *  LearningPathElement[LearningPathElement] --> LearningPathElementReturn[LearningPathElementReturn]
 *  LearningPathTopic[LearningPathTopic] --> LearningPathTopicReturn[LearningPathTopicReturn]
 *  Course[Course] --> CourseReturn[CourseReturn]
 * ```
 * @module core
 */
import LearningPathBasedOn from './CalculateLearningPath/LearningPathBasedOn'
import Course, { CourseResponse } from './Course/Course'
import LearningElement from './LearningElement/LearningElement'
import LearningElementSolution from './LearningElement/LearningElementSolution'
import LearningPathLearningElementAlgorithm, {
  LearningPathLearningElementAlgorithmResponse
} from './LearningPathAlgorithm/LearningPathLearningElementAlgorithm'
import StudentLpLeAlgorithm from './LearningPathAlgorithm/StudentLpLeAlgorithm'
import TeacherLpLeAlgorithm from './LearningPathAlgorithm/TeacherLpLeAlgorithm'
import LearningPathElement from './LearningPathElement/LearningPathElement'
import LearningPathElementStatus from './LearningPathElement/LearningPathElementStatus'
import LearningPathLearningElement from './LearningPathLearningElement/LearningPathLearningElement'
import LearningPathTopic from './LearningPathTopic/LearningPathTopic'
import News, { NewsResponse } from './News/News'
import ILS from './QuestionnaireResults/ILS'
import ListK from './QuestionnaireResults/ListK'
import RemoteCourse from './RemoteCourse/RemoteCourse'
import RemoteLearningElement from './RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from './RemoteTopic/RemoteTopic'
import StudentLearningElement from './StudentLearningElement/StudentLearningElement'
import Topic from './Topic/Topic'
import User from './User/User'

/**
 * Holds all pure business logic. Does not rely on any other components.
 */
export type {
  User,
  Course,
  CourseResponse,
  LearningElement,
  LearningElementSolution,
  LearningPathTopic,
  LearningPathElement,
  LearningPathLearningElement,
  LearningPathElementStatus,
  LearningPathLearningElementAlgorithm,
  LearningPathLearningElementAlgorithmResponse,
  StudentLpLeAlgorithm,
  TeacherLpLeAlgorithm,
  News,
  NewsResponse,
  Topic,
  StudentLearningElement,
  ILS,
  ListK,
  LearningPathBasedOn,
  RemoteCourse,
  RemoteTopic,
  RemoteLearningElement
}
export type { LearningElementSolutionReturn } from './LearningElement/LearningElementSolution'
export type { LearningPathElementReturn } from './LearningPathElement/LearningPathElement'
export type { LearningPathElementStatusReturn } from './LearningPathElement/LearningPathElementStatus'
export type { LearningPathTopicReturn } from './LearningPathTopic/LearningPathTopic'
export type { LearningPathLearningElementAlgorithmReturn } from './LearningPathAlgorithm/LearningPathLearningElementAlgorithm'
export type { StudentLpLeAlgorithmReturn } from './LearningPathAlgorithm/StudentLpLeAlgorithm'
export type { TeacherLpLeAlgorithmReturn } from './LearningPathAlgorithm/TeacherLpLeAlgorithm'
export type { ListKReturn } from './QuestionnaireResults/ListK'
export type { CourseReturn } from './Course/Course'
export type { ILSReturn } from './QuestionnaireResults/ILS'
export type { NewsReturn } from './News/News'
