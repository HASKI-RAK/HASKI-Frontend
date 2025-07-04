import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { CourseResponse, LearningPathTopic, Topic, User } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// TODO: DOCU
export type CourseTopicsReturnType = { topics: Topic[] }

// TODO: DOCU
export const useCourseTopics = (): CourseTopicsReturnType => {
  // Hooks
  const { t } = useTranslation()

  // States.
  const [topics, setTopics] = useState<Topic[]>([])

  // Store.
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Context.
  const { addSnackbar } = useContext(SnackbarContext)

  // Functions.
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
