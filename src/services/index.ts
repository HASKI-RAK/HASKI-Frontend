/**
 * Reusable service calls go here.
 * ! Dont forget to mock them in jest.setup.ts
 */
export { AuthContext } from './AuthContext'
export type { AuthContextType } from './AuthContext'
export { AuthProvider } from './AuthProvider'
export { fetchLearningPathElement } from './LearningPath'
export { fetchLearningPathTopic } from './Topic'
export { postContactForm } from './contact'
export type { FormDataType } from './contact'
export * from './auth'
export { SnackbarContext } from './SnackbarContext'
export type { SnackbarContextType } from './SnackbarContext'
export { SnackbarProvider } from './SnackbarProvider'
export { useNetworkStatus } from './connection'
export { fetchCourses } from './Courses'
export * from './xAPI'
export { fetchILS, fetchListK, postILS, postListK } from './Questionnaire'
