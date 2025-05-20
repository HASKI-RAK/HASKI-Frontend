/**
 * Reusable service calls go here.
 * ! Dont forget to mock them in jest.setup.ts
 */
export { AuthContext } from './AuthContext'
export type { AuthContextType } from './AuthContext'
export { AuthProvider } from './AuthProvider'
export { postContactForm, type FormDataType } from './contact'
export { RoleContext } from './RoleContext'
export type { RoleContextType } from './RoleContext'
export { RoleProvider } from './RoleProvider'
export {
  fetchLearningPathElement,
  fetchLearningPathElementStatus,
  fetchLearningPathElementSpecificStatus,
  postCalculateLearningPathForAllStudents
} from './LearningPath'
export { fetchLearningPathTopic, postTopic, postAddAllStudentsToTopics } from './Topic'
export * from './auth'
export * from './SnackbarContext'
export { SnackbarProvider } from './SnackbarProvider'
export * from './connection'
export { fetchCourses } from './Courses'
export { fetchRemoteCourses } from './RemoteCourses'
export { fetchRemoteTopics } from './RemoteTopics'
export { postLearningElement } from './LearningElement'
export { postLearningPathAlgorithm } from './LearningPathAlgorithm'
export { postCourse } from './Course'
export { postAddAllStudentsToCourse } from './Course'
export * from './xAPI'
export { fetchILS, fetchListK, postILS, postListK } from './Questionnaire'
export * from './debounce'
export * from './Viewport'
export { fetchNews } from './News'
export { postCalculateLearningPathILS } from './LearningPath'
export { postUserSettings } from './Theme/postUserSettings'
export { DefaultThemeProvider as ThemeProvider } from './ThemeProvider/ThemeProvider'
export { useThemeProvider } from './ThemeProvider/ThemeProvider.hooks'
export * from './PageName'
export {
  fetchStudentLpLeAlg,
  fetchTeacherLpLeAlg,
  postStudentLpLeAlg,
  postTeacherLpLeAlg
} from './LearningPathLearningElementAlgorithm'
export { postBufferContent } from './BufferContent'

export { deleteCourse } from './Course'
export { deleteTopic } from './Topic'
export { deleteLearningElement } from './LearningElement'
