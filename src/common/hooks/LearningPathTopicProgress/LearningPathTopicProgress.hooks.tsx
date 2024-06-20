import log from 'loglevel'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LearningPathElementStatus, LearningPathLearningElement, Topic, User } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// Type
type LearningPathTopicHookParams = {
  courseId?: string
}

// Type
type LearningPathTopicProgressHookReturn = {
  topicProgress: number[][]
  isLoading: boolean
  topics: Topic[]
}

/**
 * Hook to get the progress of the learning elements in a topic, for each topic in a course
 * @param courseId
 * @param topics
 * @returns - A tuple with the progress of the learning elements in a topic and a boolean indicating if the data is still loading
 */
export const useLearningPathTopicProgress = (
  params?: LearningPathTopicHookParams
): LearningPathTopicProgressHookReturn => {
  // Default values
  const { courseId = undefined } = params ?? {}

  // States
  const [topicProgress, setTopicProgress] = useState<number[][]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [topics, setTopics] = useState<Topic[]>([])

  // Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Contexts
  const { isAuth } = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

  // Fetches
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Function
  const getTopicProgress = useCallback(
    (
      learningPathElementStatusData: LearningPathElementStatus[],
      allLearningElementsInTopic: LearningPathLearningElement[]
    ) => [
      //Number of done learning elements in the current topic
      allLearningElementsInTopic.filter((learningElement) =>
        learningPathElementStatusData
          // Filter all learning elements with state 1 (done) and get the ones that are in the current topic
          .filter((learningElementStatus) => learningElementStatus.state === 1)
          .some((status) => status.cmid === learningElement.learning_element.lms_id)
      ).length,
      // Number of all learning elements in the current topic
      allLearningElementsInTopic.length
    ],
    []
  )

  // Function
  const getAllTopicProgress = useCallback(
    (user: User, topics: Topic[]) => {
      //build a array[][] with the number of done learning elements and the number of all learning elements in topic
      //do that for every topic, and lastly return an array with all the arrays for every topic
      //example: [[1,2],[2,2],[0,2]]
      return topics.map((topic) => {
        return getLearningPathElementStatus(courseId, user.lms_user_id)
          .then((learningPathElementStatusData) =>
            getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topic.id.toString())
              .then((allLearningElementsInTopic) =>
                getTopicProgress(learningPathElementStatusData, allLearningElementsInTopic.path)
              )
              .catch((error: string) => {
                addSnackbar({
                  message: t('error.fetchLearningPathElement'),
                  severity: 'error',
                  autoHideDuration: 3000
                })
                log.error(t('error.fetchLearningPathElement') + ' ' + error)
                return [] as number[]
              })
          )
          .catch((error: string) => {
            addSnackbar({
              message: t('error.fetchLearningPathElementStatus'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchLearningPathElementStatus') + ' ' + error)
            return [] as number[]
          })
      })
    },
    [getLearningPathElement, getLearningPathElementStatus, getTopicProgress, courseId]
  )

  useEffect(() => {
    setIsLoading(true)

    if (isAuth) {
      getUser()
        .then((user) =>
          getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
            .then((learningPathTopic) => {
              setTopics(learningPathTopic.topics)
              Promise.all(getAllTopicProgress(user, learningPathTopic.topics)).then((allTopicProgress) =>
                // Set the calculated progress for each topic
                setTopicProgress(allTopicProgress)
              )
              setIsLoading(false)
            })
            .catch((error: string) => {
              addSnackbar({
                message: t('error.fetchLearningPathTopic'),
                severity: 'error',
                autoHideDuration: 3000
              })
              log.error(t('error.fetchLearningPathTopic') + ' ' + error)
            })
        )
        .catch((error: string) => {
          addSnackbar({
            message: t('error.fetchUser'),
            severity: 'error',
            autoHideDuration: 3000
          })
          log.error(t('error.fetchUser') + ' ' + error)
        })
    }
  }, [isAuth, navigate, clearTimeout, getLearningPathTopic, getAllTopicProgress])

  return useMemo(() => ({ topicProgress, isLoading, topics }), [topicProgress, isLoading, topics])
}
