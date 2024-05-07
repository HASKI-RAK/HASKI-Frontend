import log from 'loglevel'
import { useEffect, useMemo, useState } from 'react'
import { Topic } from '@core'
import { usePersistedStore, useStore } from '@store'

/**
 * @param courseId - course id
 * @returns
 * A tuple with the loading state and the topics for a course
 */
const useLearningPathTopic = (courseId: string): { loading: boolean; topics: Topic[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  useEffect(() => {
    const effect = async () => {
      setLoading(true)
      try {
        const user = await getUser()
        const fetchedTopics = await getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
        setTopics(fetchedTopics.topics)
      } catch (error) {
        log.error(error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    effect().catch(() => {
      log.error('An error occurred while fetching course topics in LocalNav.hooks')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo ( () => ({ loading, topics }) , [loading, topics])
}

export {useLearningPathTopic}