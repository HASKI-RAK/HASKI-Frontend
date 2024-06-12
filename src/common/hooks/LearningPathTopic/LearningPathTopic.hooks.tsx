import log from 'loglevel'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

export type LearningPathTopicHookReturn = {
  loading: boolean
  topics: Topic[]
}

type LearningPathTopicHookParams = {
  courseId?: string
}

/**
 * @param courseId - course id
 * @returns
 * A tuple with the loading state and the topics for a course
 */
// TODO: UNUSED
export const useLearningPathTopic = (params?: LearningPathTopicHookParams): LearningPathTopicHookReturn => {
  const { courseId = undefined } = params ?? {}

  // State
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])

  // Hooks
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const { t } = useTranslation()

  useEffect(() => {
    setLoading(true)

    getUser()
      .then((user) => {
        getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
          .then((fetchedTopics) => {
            setTopics(fetchedTopics.topics)
            setLoading(false)
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.setTopics'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.setTopics') + ' ' + error)
          })
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.setTopics'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.setTopics') + ' ' + error)
      })
  }, [courseId, setTopics, getLearningPathTopic, getUser])

  return useMemo(() => ({ loading, topics }), [loading, topics])
}
