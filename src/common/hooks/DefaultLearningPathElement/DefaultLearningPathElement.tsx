import log from 'loglevel'
import { useEffect, useMemo, useState } from 'react'
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
 *
 * @param topic
 * @param courseId
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
        const dataLearningPath = await getSortedLearningPath(
          user.settings.user_id,
          user.lms_user_id,
          user.id,
          topic,
          courseId,
          getLearningPathElement
        )
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