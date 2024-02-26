import { useEffect, useState, useContext } from 'react'
import log from 'loglevel'
import { useNavigate } from 'react-router-dom'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import {
  LearningPathElement,
  LearningPathElementReturn,
  LearningPathElementStatus,
  LearningPathElementStatusReturn,
  Topic,
  User
} from '@core'
import { SnackbarMessageProps } from '@components'

const calculateLearningElementProgress = (
  allLearningElementsInTopic: LearningPathElement,
  allDoneLearningElements: LearningPathElementStatus[]
): [number, number] => {
  const allDoneLearningElementsInTopic = allLearningElementsInTopic.path.map((learningElement) => {
    return allDoneLearningElements.some((status) => status.cmid === learningElement.learning_element.lms_id);
  });
  return [
    allDoneLearningElementsInTopic.filter((stateDone) => stateDone).length,
    allLearningElementsInTopic.path.length,
  ];
};

const fetchTopicProgress = async (user: User, courseId: string, topic: Topic, getLearningPathElement:  LearningPathElementReturn, getLearningPathElementStatus:  LearningPathElementStatusReturn, addSnackbar:  (newSnackbar: SnackbarMessageProps) => void) => {
  return getLearningPathElementStatus(courseId, user.lms_user_id)
  .then(async(learningPathElementStatusData) => {
    const allDoneLearningElements = learningPathElementStatusData.filter((learningPathElementStatus) => {
      return learningPathElementStatus.state === 1
    })

    return getLearningPathElement(
      user.settings.user_id,
      user.lms_user_id,
      user.id,
      courseId,
      topic.id.toString()
    )
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
}

export const useLearningPathTopicProgress = (courseId: string, topics: Topic[]) => {
  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])
  const [loading, setLoading] = useState(true) // State for loading

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)


  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (authContext.isAuth) {
      clearTimeout(preventEndlessLoading)
      Promise.all(
        topics.map(async(topic) => {
          return getUser().then((user) => fetchTopicProgress(user, courseId, topic, getLearningPathElement, getLearningPathElementStatus, addSnackbar))
        })
      ).then((result) => {
        setCalculatedTopicProgress(result)
        setLoading(false) // Update loading state when data fetching is complete
      })
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [authContext.isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

  return { calculatedTopicProgress, loading }
}
