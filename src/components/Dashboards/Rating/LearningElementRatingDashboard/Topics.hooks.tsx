import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { CourseResponse, Topic, User } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// TODO RETURN TYPE

export const useTopics = () => {
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

  const getCourseTopics = (user: User, courseResponse: CourseResponse) => {
    const courseTopics: Topic[] = []
    courseResponse.courses.forEach((course) =>
      // Get all topics of the course.
      getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, course.id.toString())
        .then((learningPathTopicResponse) => {
          courseTopics.push(...learningPathTopicResponse.topics)
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.fetchLearningPathTopic'),
            severity: 'error',
            autoHideDuration: 3000
          })
          log.error(t('error.fetchLearningPathTopic') + ' ' + error)
        })
    )
    return courseTopics
  }

  useEffect(() => {
    // Get the user.
    getUser()
      .then((user: User) => {
        // Get the courses of the user.
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then((courseResponse) => {
            const courseTopics: Topic[] = getCourseTopics(user, courseResponse)
            setTopics(courseTopics)
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.fetchCourses'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchCourses') + ' ' + error)
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.fetchLearningElementRatings'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchLearningElementRatings') + ' ' + error)
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

  return {
    // TODO: MEMO
    topics
  }
}
