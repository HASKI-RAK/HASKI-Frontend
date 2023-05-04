import { useEffect, useState } from 'react'
import { getCourseTopics, getElementLearningPath, LearningPath, Topic } from '@services'

const getSortedLearningPath = async (data: Topic[]): Promise<LearningPath[]> => {
  const promises = data.map((topic) => getElementLearningPath(topic.id))
  const learningPaths = await Promise.all(promises)

  return learningPaths
    .filter((learningPath) => learningPath.status === 200)
    .map((learningPath) => {
      learningPath.data.path.sort((a, b) => a.position - b.position)
      return learningPath.data
    })
}

export const useLearningPath = (): { loading: boolean, topics: Topic[], learningPath: LearningPath[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const [learningPath, setLearningPath] = useState<LearningPath[]>([])

  const effect = async () => {
    setLoading(true)
    getCourseTopics().then((response) => {
      if (response.status === 200) {
        setTopics(response.data.topics)

        getSortedLearningPath(response.data.topics).then((dataLearningPath) => {
          setLearningPath(dataLearningPath)
          setLoading(false)
        })
      } else {
        // some error occurred
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    effect().catch(() => {
        setLoading(false)
    })
  }, [])

  return { loading, topics, learningPath }
}
