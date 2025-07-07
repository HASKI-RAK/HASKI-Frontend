/**
 * # Home Page
 * Presents an overview of the courses.
 *
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
 *
 * @category Pages
 */
export { default as Imprint } from './Imprint'
