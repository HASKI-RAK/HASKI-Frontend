import log from 'loglevel'
import { useEffect, useMemo, useState } from 'react'
import { LearningPathElement, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'

/**
 *
 * @param topic
 * @param courseId
 * @returns
 * A tuple with the loading state and the learning path elements for a topic
 */
const useLearningPathElement = (
  topic: Topic,
  courseId: string
): { loadingElements: boolean; learningPaths: LearningPathElement | undefined } => {
  const [loadingElements, setLoadingElements] = useState(true)
  const [learningPaths, setLearningPaths] = useState<LearningPathElement>()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)

  useEffect(() => {
    const effect = async () => {
      setLoadingElements(true)
      try {
        const user = await getUser()
        const dataLearningPath = await getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topic.id.toString())
        dataLearningPath.path.sort((a, b) => a.position - b.position)
        setLearningPaths(dataLearningPath)
      } catch (error) {
        log.error(error)
        throw error
      } finally {
        setLoadingElements(false)
      }
    }

    effect().catch(() => {
      log.error('An error occurred while fetching course Topic Elements in LocalNav.hooks')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo ( () => ({ loadingElements, learningPaths }), [loadingElements, learningPaths])
}

export {useLearningPathElement}