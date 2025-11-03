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
import Badge from './Badge/Badge'
import StudentBadge from './Badge/StudentBadge'
import LearningPathBasedOn from './CalculateLearningPath/LearningPathBasedOn'
import Course, { CourseResponse } from './Course/Course'
import DefaultLearningPath from './DefaultLearningPath/DefaultLearningPath'
import { ExperiencePoints } from './ExperiencePoints/ExperiencePoints'
import { ExperiencePointsPostData } from './ExperiencePoints/ExperiencePointsPost'
import Leaderboard from './Leaderboard/Leaderboard'
import LearningElement from './LearningElement/LearningElement'
import LearningPathLearningElementAlgorithm from './LearningPathAlgorithm/LearningPathLearningElementAlgorithm'
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
import RemoteTopics from './RemoteTopic/RemoteTopics'
import StudentLearningElement from './StudentLearningElement/StudentLearningElement'
import Topic from './Topic/Topic'
import User from './User/User'

/**
 * Holds all pure business logic. Does not rely on any other components.
 */
export type {
  Badge,
  Course,
  CourseResponse,
  DefaultLearningPath,
  ExperiencePoints,
  ExperiencePointsPostData,
  ILS,
  Leaderboard,
  LearningElement,
  LearningPathBasedOn,
  LearningPathElement,
  LearningPathElementStatus,
  LearningPathLearningElement,
  LearningPathLearningElementAlgorithm,
  LearningPathTopic,
  ListK,
  News,
  NewsResponse,
  RemoteCourse,
  RemoteLearningElement,
  RemoteTopics,
  StudentBadge,
  StudentLearningElement,
  StudentLpLeAlgorithm,
  TeacherLpLeAlgorithm,
  Topic,
  User
}
export type { BadgeResponse, BadgeReturn, CourseBadgesReturn, PostBadgeReturn } from './Badge/Badge'
export type {
  StudentBadgePostInput,
  StudentBadgePostReturn,
  StudentBadgeResponse,
  StudentBadgeReturn
} from './Badge/StudentBadge'
export type { CourseReturn } from './Course/Course'
export type { DefaultLearningPathResponse } from './DefaultLearningPath/DefaultLearningPath'
export type { ExperiencePointsReturn } from './ExperiencePoints/ExperiencePoints'
export type { ExPointLeaderboardResponse, ExPointLeaderboardReturn } from './ExperiencePoints/ExperiencePoints'
export type { ExperiencePointsPostResponse, ExperiencePointsPostReturn } from './ExperiencePoints/ExperiencePointsPost'
export type { LeaderboardReturn } from './Leaderboard/Leaderboard'
export * from './LearningElementRecommendation'
export type { LearningPathLearningElementAlgorithmReturn } from './LearningPathAlgorithm/LearningPathLearningElementAlgorithm'
export type { StudentLpLeAlgorithmReturn } from './LearningPathAlgorithm/StudentLpLeAlgorithm'
export type { TeacherLpLeAlgorithmReturn } from './LearningPathAlgorithm/TeacherLpLeAlgorithm'
export type { LearningPathElementReturn } from './LearningPathElement/LearningPathElement'
export type { LearningPathElementStatusReturn } from './LearningPathElement/LearningPathElementStatus'
export type { LearningPathTopicReturn } from './LearningPathTopic/LearningPathTopic'
export type { NewsReturn } from './News/News'
export type { ILSReturn } from './QuestionnaireResults/ILS'
export type { ListKReturn } from './QuestionnaireResults/ListK'
export * from './Rating'
export type { RemoteTopicsReturn } from './RemoteTopic/RemoteTopics'
