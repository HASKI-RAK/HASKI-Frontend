import log from 'loglevel'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Topic } from '@core'
import { usePersistedStore, useStore } from '@store'
import { SnackbarContext } from '@services'
import { useTranslation } from 'react-i18next'


export type LearningPathTopicHookReturn = {
  loading: boolean
  topics: Topic[]
}

/**
 * @param courseId - course id
 * @returns
 * A tuple with the loading state and the topics for a course
 */
const useLearningPathTopic = (courseId: string): LearningPathTopicHookReturn => {
  // State
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])

  // Hooks
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      getUser()
      .then(user => {
        return getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId);
      })
       .then(fetchedTopics => {
        setTopics(fetchedTopics.topics);
      })
       .catch(error => {
        addSnackbar({
          message: t('error.setTopics'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.setTopics') + "Error message: " + error);
      })
       .finally(() => {
        setLoading(false);
      })
    }

    fetchData();
  }, [courseId]);

  return useMemo(() => ({ loading, topics }), [loading, topics])
}

export { useLearningPathTopic }