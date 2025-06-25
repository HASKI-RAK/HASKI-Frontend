import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { Topic, User } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

export const useTopics = () => {
  // Hooks
  const { t } = useTranslation()

  // States. // TODO: Duplicates
  const [topics, setTopics] = useState<Topic[]>([])

  // Store. // TODO: Duplicates
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Context. // TODO: Duplicates
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    // Get the user.
    getUser()
      .then((user: User) => {
        // Get the courses of the user.
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then((courseResponse) => {
            const courseTopics: Topic[] = []
            Promise.all(
              courseResponse.courses.map((course) =>
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
            ).then(() => {
              setTopics(courseTopics)
            })
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

  return { // TODO: MEMO
    topics
  }
}
