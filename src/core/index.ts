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
import DefaultLearningPath from './DefaultLearningPath/DefaultLearningPath'
import FavoriteElement from './FavoriteElement/FavoriteElement'
import LearningElement from './LearningElement/LearningElement'
import LearningElementSolution from './LearningElement/LearningElementSolution'
import LearningPathLearningElementAlgorithm, {
  LearningPathLearningElementAlgorithmResponse
} from './LearningPathAlgorithm/LearningPathLearningElementAlgorithm'
import StudentLpLeAlgorithm from './LearningPathAlgorithm/StudentLpLeAlgorithm'
import TeacherLpLeAlgorithm from './LearningPathAlgorithm/TeacherLpLeAlgorithm'
import LearningPathElement from './LearningPathElement/LearningPathElement'
import LearningPathElementStatus from './LearningPathElement/LearningPathElementStatus'
import LearningPathElementSolution from './LearningPathElementSolution/LearningPathElementSolution'
import LearningPathLearningElement from './LearningPathLearningElement/LearningPathLearningElement'
import LearningPathTopic from './LearningPathTopic/LearningPathTopic'
import News, { NewsResponse } from './News/News'
import ILS from './QuestionnaireResults/ILS'
import ListK from './QuestionnaireResults/ListK'
import RemoteCourse from './RemoteCourse/RemoteCourse'
import RemoteLearningElement from './RemoteLearningElement/RemoteLearningElement'
import LearningElementWithSolution from './RemoteLearningElementWithSolution/RemoteLearningElementWithSolution'
import RemoteTopics from './RemoteTopic/RemoteTopics'
import StudentLearningElement from './StudentLearningElement/StudentLearningElement'
import Topic from './Topic/Topic'
import User from './User/User'

/**
 * Holds all pure business logic. Does not rely on any other components.
 */
export type {
  Course,
  CourseResponse,
  DefaultLearningPath,
  FavoriteElement,
  ILS,
  LearningElement,
  LearningElementSolution,
  LearningElementWithSolution,
  LearningPathBasedOn,
  LearningPathElement,
  LearningPathElementSolution,
  LearningPathElementStatus,
  LearningPathLearningElement,
  LearningPathLearningElementAlgorithm,
  LearningPathLearningElementAlgorithmResponse,
  LearningPathTopic,
  ListK,
  News,
  NewsResponse,
  RemoteCourse,
  RemoteLearningElement,
  RemoteTopics,
  StudentLearningElement,
  StudentLpLeAlgorithm,
  TeacherLpLeAlgorithm,
  Topic,
  User
}
export type { CourseReturn } from './Course/Course'
export type { DefaultLearningPathResponse } from './DefaultLearningPath/DefaultLearningPath'
export type { FavoriteElementReturn } from './FavoriteElement/FavoriteElement'
export type { LearningElementSolutionReturn } from './LearningElement/LearningElementSolution'
export type { LearningPathLearningElementAlgorithmReturn } from './LearningPathAlgorithm/LearningPathLearningElementAlgorithm'
export type { StudentLpLeAlgorithmReturn } from './LearningPathAlgorithm/StudentLpLeAlgorithm'
export type { TeacherLpLeAlgorithmReturn } from './LearningPathAlgorithm/TeacherLpLeAlgorithm'
export type { LearningPathElementReturn } from './LearningPathElement/LearningPathElement'
export type { LearningPathElementStatusReturn } from './LearningPathElement/LearningPathElementStatus'
export type { LearningPathElementSolutionReturn } from './LearningPathElementSolution/LearningPathElementSolution'
export type { LearningPathTopicReturn } from './LearningPathTopic/LearningPathTopic'
export type { NewsReturn } from './News/News'
export type { ILSReturn } from './QuestionnaireResults/ILS'
export type { ListKReturn } from './QuestionnaireResults/ListK'
export type { RemoteTopicsReturn } from './RemoteTopic/RemoteTopics'
