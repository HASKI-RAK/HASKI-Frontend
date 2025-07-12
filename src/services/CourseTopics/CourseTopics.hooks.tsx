import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { CourseResponse, LearningPathTopic, Topic, User } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

/**
 * Return type for the {@link useCourseTopics} hook.
 */
export type CourseTopicsReturnType = {
  /**
   * List of topics fetched from all courses.
   */
  topics: Topic[]
}

/**
 * Hook to retrieve topics from all courses.
 *
 * This hook fetches topics from all courses of the current user.
 *
 * @category Hooks
 *
 * @returns See {@link CourseTopicsReturnType}.
 *
 * @example
 * ```tsx
 * const { topics } = useCourseTopics()
 * ```
 */
export const useCourseTopics = (): CourseTopicsReturnType => {
  // Hook
  const { t } = useTranslation()

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Context
  const { addSnackbar } = useContext(SnackbarContext)
  const { isAuth } = useContext(AuthContext)

  // State
  /**
   * Stores the topics from all courses.
   */
  const [topics, setTopics] = useState<Topic[]>([])

  // Functions
  /**
   * Fetches topics from all courses of the user.
   *
   * @param courseResponse - List of all available courses.
   * @param user - The current user.
   */
  const getCourseTopics = async (courseResponse: CourseResponse, user: User) => {
    // Get all topics for each course.
    const courseTopics = courseResponse.courses.map((course) =>
      getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, course.id.toString())
        .then((learningPathTopic: LearningPathTopic) => learningPathTopic.topics)
        .catch((error) => {
          addSnackbar({
            message: t('error.fetchLearningPathTopic'),
            severity: 'error',
            autoHideDuration: 3000
          })
          log.error(t('error.fetchLearningPathTopic') + ' ' + error)
          // Return an empty array if an error occurs.
          return []
        })
    )
    // Wait for all promises to resolve and flatten the array of topics.
    return (await Promise.all(courseTopics)).flat()
  }

  useEffect(() => {
    // If the user is not authenticated, do not fetch topics.
    if (!isAuth) return

    // Get the user.
    getUser()
      .then((user: User) => {
        // Get the courses of the user.
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then(async (courseResponse) => {
            setTopics(await getCourseTopics(courseResponse, user))
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.fetchCourses'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchCourses') + ' ' + error)
          })
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.fetchUser'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.fetchUser') + ' ' + error)
      })
  }, [])

  return useMemo(
    () => ({
      topics
    }),
    [topics]
  )
}
