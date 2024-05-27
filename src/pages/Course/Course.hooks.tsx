import log from 'loglevel'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LearningPathElementStatus, LearningPathLearningElement, Topic, User } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// Type
type CourseHookReturn = {
  calculatedTopicProgress: number[][]
  isLoading: boolean
  topics: Topic[]
}

// Hook
export const useCourse = (): CourseHookReturn => {
  // States
  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [topics, setTopics] = useState<Topic[]>([])

  // Contexts
  const { isAuth } = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

  // Hooks
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }

  // Stores
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
                  message: error,
                  severity: 'error',
                  autoHideDuration: 3000
                })
                return []
              })
          )
          .catch((error: string) => {
            addSnackbar({
              message: error,
              severity: 'error',
              autoHideDuration: 3000
            })
            return []
          })
      })
    },
    [addSnackbar, getLearningPathElement, getLearningPathElementStatus, getTopicProgress, courseId]
  )

  useEffect(() => {
    setIsLoading(true)

    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (isAuth) {
      clearTimeout(preventEndlessLoading)

      getUser()
        .then((user) =>
          getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
            .then((learningPathTopic) => {
              setIsLoading(false)
              setTopics(learningPathTopic.topics)
              Promise.all(getAllTopicProgress(user, learningPathTopic.topics))
                .then((allTopicProgress) =>
                  // Set the calculated progress for each topic
                  setCalculatedTopicProgress(allTopicProgress)
                )
                .catch((error: string) => {
                  addSnackbar({
                    message: error,
                    severity: 'error',
                    autoHideDuration: 3000
                  })
                })
            })
            .catch((error: string) => {
              addSnackbar({
                message: error,
                severity: 'error',
                autoHideDuration: 3000
              })
            })
        )
        .catch((error: string) => {
          addSnackbar({
            message: error,
            severity: 'error',
            autoHideDuration: 3000
          })
        })
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [isAuth, courseId, navigate, getUser, getLearningPathElement, getLearningPathElementStatus])

  return useMemo(() => ({ calculatedTopicProgress, isLoading, topics }), [calculatedTopicProgress, isLoading, topics])
}
