/**
 * Reusable service calls go here.
 * Dont forget to mock them in jest.setup.ts
 */
export { AuthContext } from './AuthContext'
export type { AuthContextType } from './AuthContext'
export { AuthProvider } from './AuthProvider'
export type { LearningPath, LearningElement, PathItem, LearningPathRequestResponse  } from './LearningPath'
export { getLearningPathTopic } from './Topic'
export type { Topic, TopicsResponse, TopicRequestResponse } from './Topic'
export * from './auth'
export { SnackbarContext } from './SnackbarContext'
export type { SnackbarContextType } from './SnackbarContext'
export { SnackbarProvider } from './SnackbarProvider'
export { useNetworkStatus } from './connection'
export { getLearningPathElement, getElementLearningPath } from './LearningPath'
export { getCourses } from './Courses'
