import { useEffect, useState } from 'react'
import { getElementLearningPath, getLearningPathElement, LearningPath, Topic } from '@services'
import { LearningPathElement, LearningPathTopic, LearningPathTopicReturn } from '@core'
import log from 'loglevel'
import useBoundStore from '@store'
import { LearningPathElementReturn } from '@core'

export const getSortedLearningPath = async (
  data: Topic[],
  fetchLearningPath: LearningPathElementReturn
): Promise<LearningPathElement[]> => {
  const promises = data.map((topic) => fetchLearningPath(topic.id)) //reihenfolge der parameter beachten
  const learningPaths = await Promise.all(promises)

  return learningPaths.map((learningPath) => {
    learningPath.path.sort((a, b) => a.position - b.position)
    return learningPath
  })
}

export const useLearningPath = (): { loading: boolean; topics: Topic[]; learningPaths: LearningPathElement[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const [learningPaths, setLearningPaths] = useState<LearningPathElement[]>([])
  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchLearningPathElement = useBoundStore((state) => state.fetchLearningPathElement)
  const fetchLearningPathTopic = useBoundStore((state) => state.fetchLearningPathTopic)

  const effect = async () => {
    setLoading(true)
    try {
      const user = await fetchUser()
      const fetchedTopics = await fetchLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id)
      setTopics(fetchedTopics.topics)

      const dataLearningPath = await getSortedLearningPath(topics, fetchLearningPathElement)

      setLearningPaths(dataLearningPath)
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

  return { loading, topics, learningPaths }
}
