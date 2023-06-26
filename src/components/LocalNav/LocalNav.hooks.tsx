import {useContext, useEffect, useState} from 'react'
import {getCourseTopics, getElementLearningPath, LearningPath, SnackbarContext, Topic} from '@services'
import log from 'loglevel'
import {useTranslation} from "react-i18next";

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

  //snackbar
  const { addSnackbar } = useContext(SnackbarContext)
  const { t } = useTranslation()

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
        addSnackbar({severity: 'error', message: t('components.LocalNav.ErrorServerResponse'), autoHideDuration: 5000})
        setLoading(false)
      }
    } catch (error) {
      log.error(error)
      addSnackbar({severity: 'error', message: t('components.LocalNav.ErrorFetchingTopics'), autoHideDuration: 5000})
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    effect().catch(() => {
      log.error('An error occurred while fetching course topics in LocalNav.hooks')
      addSnackbar({severity: 'error', message: t('components.LocalNav.ErrorFetchingTopics'), autoHideDuration: 5000})
    })
  }, [])

  return { loading, topics, learningPaths }
}
