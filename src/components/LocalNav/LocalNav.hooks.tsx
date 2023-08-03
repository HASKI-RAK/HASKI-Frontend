import { useEffect, useState } from 'react'
import { Topic } from '@services'
import { LearningPathElement } from '@core'
import log from 'loglevel'
import { useStore, usePersistedStore } from '@store'
import { LearningPathElementReturn } from '@core'

const initialLearningPathElement: LearningPathElement = {
  id: 99999,
  course_id: 99999,
  based_on: 'initial LearningPathElement',
  calculated_on: 'initial LearningPathElement',
  path: [
    {
      id: 99999,
      learning_element_id: 99999,
      learning_path_id: 99999,
      recommended: true,
      position: 99999,
      learning_element: {
        id: 99999,
        lms_id: 99999,
        activity_type: 'initial LearningPathElement',
        classification: 'initial LearningPathElement',
        name: 'initial LearningPathElement',
        university: 'initial LearningPathElement',
        created_by: 'initial LearningPathElement',
        created_at: 'initial LearningPathElement',
        last_updated: 'initial LearningPathElement',
        student_learning_element: {
          id: 99999,
          student_id: 99999,
          learning_element_id: 99999,
          done: false,
          done_at: 'initial LearningPathElement'
        }
      }
    }
  ]
}

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

export const useLearningPathTopic = (courseId: string): { loading: boolean; topics: Topic[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchLearningPathTopic = useStore((state) => state.fetchLearningPathTopic)

  useEffect(() => {
    const effect = async () => {
      setLoading(true)
      try {
        const user = await fetchUser()
        const fetchedTopics = await fetchLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
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

  return { loading, topics }
}

export const useLearningPathElement = (
  topic: Topic,
  courseId: string
): { loadingElements: boolean; learningPaths: LearningPathElement } => {
  const [loadingElements, setLoadingElements] = useState(true)
  const [learningPaths, setLearningPaths] = useState<LearningPathElement>(initialLearningPathElement)
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchLearningPathElement = useStore((state) => state.fetchLearningPathElement)

  useEffect(() => {
    const effect = async () => {
      setLoadingElements(true)
      try {
        const user = await fetchUser()
        const dataLearningPath = await getSortedLearningPath(
          user.settings.user_id,
          user.lms_user_id,
          user.id,
          topic,
          courseId,
          fetchLearningPathElement
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

  return { loadingElements, learningPaths }
}
