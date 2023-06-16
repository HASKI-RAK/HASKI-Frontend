import { useEffect, useState } from 'react'
import { Topic } from '@services'
import { LearningPathElement } from '@core'
import log from 'loglevel'
import useBoundStore from '@store'
import { LearningPathElementReturn } from '@core'

const initialLearningPathElement: LearningPathElement = {
  id: 99999,
  course_id: 99999,
  based_on: 'inital LearningPathElement',
  calculated_on: 'inital LearningPathElement',
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
        activity_type: 'inital LearningPathElement',
        classification: 'inital LearningPathElement',
        name: 'inital LearningPathElement',
        university: 'inital LearningPathElement',
        created_by: 'inital LearningPathElement',
        created_at: 'inital LearningPathElement',
        last_updated: 'inital LearningPathElement',
        student_learning_element: {
          id: 99999,
          student_id: 99999,
          learning_element_id: 99999,
          done: false,
          done_at: 'inital LearningPathElement'
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
  fetchLearningPath: LearningPathElementReturn
): Promise<LearningPathElement> => {
  const learningPath = await fetchLearningPath(userid, lmsUserid, studentid, 2, data.id)
  learningPath.path.sort((a, b) => a.position - b.position)
  return learningPath
}

export const useLearningPathTopic = (): { loading: boolean; topics: Topic[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPathTopic = useBoundStore((state) => state.fetchLearningPathTopic)

  const effect = async () => {
    setLoading(true)
    try {
      const user = await fetchUser()
      const fetchedTopics = await fetchLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, 2)
      setTopics(fetchedTopics.topics)
    } catch (error) {
      log.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    effect().catch(() => {
      log.error('An error occurred while fetching course topics in LocalNav.hooks')
    })
  }, [])

  return { loading, topics }
}

export const useLearningPathElement = (
  topic: Topic
): { loadingElements: boolean; learningPaths: LearningPathElement } => {
  const [loadingElements, setLoadingElements] = useState(true)
  const [learningPaths, setLearningPaths] = useState<LearningPathElement>(initialLearningPathElement)
  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPathElement = useBoundStore((state) => state.fetchLearningPathElement)

  const effect = async () => {
    setLoadingElements(true)
    try {
      const user = await fetchUser()
      const dataLearningPath = await getSortedLearningPath(
        user.settings.user_id,
        user.lms_user_id,
        user.id,
        topic,
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

  useEffect(() => {
    effect().catch(() => {
      log.error('An error occurred while fetching course Topic Elements in LocalNav.hooks')
    })
  }, [])

  return { loadingElements, learningPaths }
}
