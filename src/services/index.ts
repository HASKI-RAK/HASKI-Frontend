/**
 * Reusable service calls go here.
 * ! Dont forget to mock them in jest.setup.ts
 */
export { AuthContext } from './AuthContext'
export type { AuthContextType } from './AuthContext'
export { AuthProvider } from './AuthProvider'
export { getLearningPathElement } from './LearningPath'
export { getLearningPathTopic } from './Topic'
export { postContactForm } from './contact'
export type { FormDataType } from './contact'
export * from './auth'
export { SnackbarContext } from './SnackbarContext'
export type { SnackbarContextType } from './SnackbarContext'
export { SnackbarProvider } from './SnackbarProvider'
export { useNetworkStatus } from './connection'
export { getCourses } from './Courses'
export { getILS, getListK, postILS, postListK } from './Questionnaire'
