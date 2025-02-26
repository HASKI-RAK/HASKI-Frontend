/**
 * Reusable service calls go here.
 * ! Dont forget to mock them in jest.setup.ts
 */
export { AuthContext } from './AuthContext'
export type { AuthContextType } from './AuthContext'
export { AuthProvider } from './AuthProvider'
export { fetchLearningElementSolution } from './LearningElementSolution'
export { postLearningElementSolution } from './LearningElementSolution'
export { RoleContext } from './RoleContext'
export type { RoleContextType } from './RoleContext'
export { RoleProvider } from './RoleProvider'
export {
  fetchLearningPathElement,
  fetchLearningPathElementStatus,
  fetchLearningPathElementSpecificStatus,
  postCalculateLearningPathForAllStudents
} from './LearningPath'
export { fetchLearningPathTopic, postTopic } from './Topic'
export { postContactForm } from './contact'
export type { FormDataType } from './contact'
export * from './auth'
export * from './SnackbarContext'
export { SnackbarProvider } from './SnackbarProvider'
export * from './connection'
export { fetchCourses } from './Courses'
export { fetchRemoteCourses } from './RemoteCourses'
export { postLearningElement } from './LearningElement'
export { postLearningPathAlgorithm } from './LearningPathAlgorithm'
export { postCourse } from './Course'
export * from './xAPI'
export { fetchILS, fetchListK, postILS, postListK } from './Questionnaire'
export * from './debounce'
export * from './Viewport'
export { fetchNews } from './News'
export { postCalculateLearningPathILS } from './LearningPath'
export {
  fetchStudentLpLeAlg,
  fetchTeacherLpLeAlg,
  postStudentLpLeAlg,
  postTeacherLpLeAlg
} from './LearningPathLearningElementAlgorithm'
