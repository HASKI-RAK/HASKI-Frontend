import { useEffect, useState, useContext, useMemo, useCallback } from 'react'
import log from 'loglevel'
import { useNavigate } from 'react-router-dom'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import {
  LearningPathElement,
  LearningPathElementStatus,
  Topic,
  User
} from '@core'


/**
 * Hook to get the progress of the learning elements in a topic, for each topic in a course
 * @param courseId
 * @param topics
 * @returns - A tuple with the progress of the learning elements in a topic and a boolean indicating if the data is still loading
 */
const useLearningPathTopicProgress = (courseId: string, topics: Topic[]) => {
  // States
  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])
  const [loading, setLoading] = useState(true) // State for loading
  // Hooks
  const navigate = useNavigate()
  // Contexts
  const { isAuth } = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

  // Fetches
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const calculateLearningElementProgress = useCallback(
    (
      allLearningElementsInTopic: LearningPathElement,
      allDoneLearningElements: LearningPathElementStatus[]
    ): [number, number] => {
      const allDoneLearningElementsInTopic = allLearningElementsInTopic.path.map((learningElement) =>
        allDoneLearningElements.some((status) => status.cmid === learningElement.learning_element.lms_id)
      )
      return [
        allDoneLearningElementsInTopic.filter((stateDone) => stateDone).length,
        allLearningElementsInTopic.path.length
      ]
    },
    []
  )
  // Comment what function does
  const getTopicProgress = useCallback(
    (user: User, topic: Topic) => {
      return getLearningPathElementStatus(courseId, user.lms_user_id)
      .then((learningPathElementStatusData) => {
        const allDoneLearningElements = learningPathElementStatusData.filter(
          (learningPathElementStatus) => learningPathElementStatus.state === 1
        )
        return getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topic.id.toString())
        .then((allLearningElementsInTopic) => {
          return calculateLearningElementProgress(allLearningElementsInTopic, allDoneLearningElements)
        })
         .catch((error: string) => {
          addSnackbar({
            message: error,
            severity: 'error',
            autoHideDuration: 3000
          })
          return []
        })
      })
       .catch((error: string) => {
        addSnackbar({
          message: error,
          severity: 'error',
          autoHideDuration: 3000
        })
        return []
      })
    },
    [getLearningPathElementStatus, getLearningPathElement, addSnackbar, courseId]
  )

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (isAuth) {
      clearTimeout(preventEndlessLoading)
      Promise.all(
        topics.map(async (topic) => {
          return getUser().then((user) =>
            getTopicProgress(user, topic)
          )
        })
      ).then((result) => {
        setCalculatedTopicProgress(result)
        setLoading(false) // Update loading state when data fetching is complete
      })
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

  return useMemo(() => ({ topicProgress: calculatedTopicProgress, loading }), [calculatedTopicProgress, loading])
}

export { useLearningPathTopicProgress }