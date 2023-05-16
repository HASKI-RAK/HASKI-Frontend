import { useEffect, useState } from 'react'
import { getCourseTopics, getElementLearningPath, LearningPath, Topic } from '@services'
import log from 'loglevel'

export const getSortedLearningPath = async (data: Topic[]): Promise<LearningPath[]> => {
  const promises = data.map((topic) => getElementLearningPath(topic.id))
  const learningPaths = await Promise.all(promises)

  return learningPaths
    .filter((learningPath) => learningPath.status === 200)
    .map((learningPath) => {
      learningPath.data.path.sort((a, b) => a.position - b.position)
      return learningPath.data
    })
}

export const useLearningPath = (): { loading: boolean; topics: Topic[]; learningPaths: LearningPath[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])

  const effect = async () => {
    setLoading(true)
    try {
      const response = await getCourseTopics()
      if (response.status === 200) {
        setTopics(response.data.topics)
        const dataLearningPath = await getSortedLearningPath(response.data.topics)
        setLearningPaths(dataLearningPath)
      } else {
        // some error occurred
        setLoading(false)
      }
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
