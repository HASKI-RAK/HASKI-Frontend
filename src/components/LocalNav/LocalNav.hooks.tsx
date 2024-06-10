import log from 'loglevel'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LearningPathElement, LearningPathElementReturn, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'

/**
 * This function sorts the learning path elements by position.
 * @param userid - user id
 * @param lmsUserid - lms user id
 * @param studentid - student id
 * @param data - topic data
 * @param courseId - course id
 * @param fetchLearningPath - fetch learning path function
 *
 * @remarks
 * It makes a call to the fetchLearningPath function to get the learning path elements.
 * @returns
 */
export const getSortedLearningPath = async (
  userid: number,
  lmsUserid: number,
  studentid: number,
  data: Topic,
  courseId: string,
  fetchLearningPath: LearningPathElementReturn
): Promise<LearningPathElement> => {
  const learningPath = await fetchLearningPath(userid, lmsUserid, studentid, courseId, data.id.toString())
  learningPath.path.sort((a, b) => a.position - b.position)
  return learningPath
}

/**
 * @param courseId - course id
 */
export const useLearningPathTopic = (courseId: string): { loading: boolean; topics: Topic[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
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
            log.error(t('error.fetchLearningPathTopic') + ' ' + error)
          })
      })
      .catch((error) => {
        log.error(t('error.fetchUser') + ' ' + error)
      })
  }, [courseId, setTopics, getLearningPathTopic, getUser])

  return useMemo(
    () => ({
      loading,
      topics
    }),
    [loading, topics]
  )
}

export const useLearningPathElement = (
  topic: Topic,
  courseId: string
): { loadingElements: boolean; learningPaths: LearningPathElement | undefined } => {
  const [loadingElements, setLoadingElements] = useState(true)
  const [learningPaths, setLearningPaths] = useState<LearningPathElement>()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const { t } = useTranslation()

  useEffect(() => {
    setLoadingElements(true)
    getUser()
      .then((user) => {
        getSortedLearningPath(user.settings.user_id, user.lms_user_id, user.id, topic, courseId, getLearningPathElement)
          .then((dataLearningPath) => {
            setLearningPaths(dataLearningPath)
            setLoadingElements(false)
          })
          .catch((error) => {
            log.error(t('error.getSortedLearningPath') + ' ' + error)
          })
      })
      .catch((error) => {
        log.error(t('error.fetchUser') + ' ' + error)
      })
  }, [setLoadingElements, setLearningPaths, getLearningPathElement, getUser, topic, courseId])

  return { loadingElements, learningPaths }
}
