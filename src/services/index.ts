/**
 * Reusable service calls go here.
 * ! Dont forget to mock them in jest.setup.ts
 */
export * from './auth'
export type { AuthContextType } from './AuthContext'
export { AuthContext } from './AuthContext'
export { AuthProvider } from './AuthProvider'
export { postBufferContent } from './BufferContent'
export * from './connection'
export { type FormDataType, postContactForm } from './contact'
export { postCourse } from './Course'
export { postAddAllStudentsToCourse } from './Course'
export { deleteCourse } from './Course'
export { fetchCourses } from './Courses'
export * from './CourseTopics'
export * from './debounce'
export { fetchDefaultLearningPath, fetchDisabledClassifications, postDefaultLearningPath } from './DefaultLearningPath'
export { postFavorite } from './Favorite/postFavorite'
export { fetchFavorite } from './Favorite/fetchFavorite'
export { postLearningElement } from './LearningElement'
export { deleteLearningElement } from './LearningElement'
export { fetchLearningElementSolution } from './LearningElementSolution'
export { postLearningElementSolution } from './LearningElementSolution'
export {
  fetchLearningPathElement,
  fetchLearningPathElementSolution,
  fetchLearningPathElementSpecificStatus,
  fetchLearningPathElementStatus,
  postCalculateLearningPathForAllStudents
} from './LearningPath'
export { postCalculateLearningPathILS } from './LearningPath'
export { postLearningPathAlgorithm } from './LearningPathAlgorithm'
export {
  fetchStudentLpLeAlg,
  fetchTeacherLpLeAlg,
  postStudentLpLeAlg,
  postTeacherLpLeAlg
} from './LearningPathLearningElementAlgorithm'
export { fetchNews } from './News'
export * from './PageName'
export { fetchILS, fetchListK, postILS, postListK } from './Questionnaire'
export * from './Rating'
export { fetchRemoteCourses } from './RemoteCourses'
export { fetchRemoteTopics } from './RemoteTopics'
export type { RoleContextType } from './RoleContext'
export { RoleContext } from './RoleContext'
export { RoleProvider } from './RoleProvider'
export * from './SnackbarContext'
export { SnackbarProvider } from './SnackbarProvider'
export { fetchLearningPathTopic, postAddAllStudentsToTopics, postTopic } from './Topic'
export { deleteTopic } from './Topic'
export { deleteLearningElementSolution } from './LearningElementSolution'
export * from './Viewport'
export * from './xAPI'
