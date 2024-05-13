import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery, useTheme } from '@common/hooks'
import { useLearningPathTopic } from '@components'
import { LearningPathElementStatus, LearningPathLearningElement } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

type CourseHookReturn = {
  calculatedTopicProgress: { a: number; b: number }[]
}

export const useCourse = (): CourseHookReturn => {
  const theme = useTheme()
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }
  const { addSnackbar } = useContext(SnackbarContext)
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))

  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<{ a: number; b: number }[]>([])
  const { loading, topics } = useLearningPathTopic(courseId)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  const filterAllDoneLearningElementsInTopic = (
    learningPath: LearningPathLearningElement[],
    allDoneLearningElements: LearningPathElementStatus[]
  ) =>
    learningPath.map((learningElement) =>
      allDoneLearningElements.some((status) => status.cmid === learningElement.learning_element.lms_id)
    )

  const test = (
    allLearningPathElementStatus: LearningPathElementStatus[],
    allLearningElementsInTopic: LearningPathLearningElement[]
  ) => {
    return {
      a: filterAllDoneLearningElementsInTopic(
        allLearningElementsInTopic,
        allLearningPathElementStatus.filter((learningPathElementStatus) => {
          return learningPathElementStatus.state === 1
        })
      ).filter((stateDone: boolean) => stateDone).length,
      b: allLearningElementsInTopic.length
    }
  }

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (isAuth) {
      clearTimeout(preventEndlessLoading)
      setCalculatedTopicProgress([])

      //Promise.all(
      getUser()
        .then((user) => {
          getLearningPathElementStatus(courseId, user.lms_user_id)
            .then((learningPathElementStatusData) => {
              getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
                .then((fetchedTopics) => {
                  fetchedTopics.topics
                    .map((topic) => {
                      return getLearningPathElement(
                        user.settings.user_id,
                        user.lms_user_id,
                        user.id,
                        courseId,
                        topic.id.toString()
                      )
                        .then((allLearningElementsInTopic) => {
                          /*
                    //filter all learning elements with state 1 (done)
                    const allDoneLearningElements = learningPathElementStatusData.filter(
                      (learningPathElementStatus) => {
                        return learningPathElementStatus.state === 1
                      }
                    )
                    //filter all learning elements in topic for done learning elements
                    const allDoneLearningElementsInTopic = filterAllDoneLearningElementsInTopic(
                      allLearningElementsInTopic.path,
                      allDoneLearningElements
                    )
                    //build a array[][] with the number of done learning elements and the number of all learning elements in topic
                    //do that for every topic, and lastly return an array with all the arrays for every topic
                    //example: [[1,2],[2,2],[0,2]]
                    return {
                      a: allDoneLearningElementsInTopic.filter((stateDone: boolean) => stateDone).length,
                      b: allLearningElementsInTopic.path.length
                    }
                    */
                          return test(learningPathElementStatusData, allLearningElementsInTopic.path)
                        })
                        .catch((error: string) => {
                          console.log('hier 0')
                          addSnackbar({
                            message: error,
                            severity: 'error',
                            autoHideDuration: 3000
                          })
                          return { a: 0, b: 0 }
                        })
                    })
                    .forEach(async (value) => setCalculatedTopicProgress([...calculatedTopicProgress, await value]))
                })
                .catch((error: string) => {
                  console.log('hier 3')
                  addSnackbar({
                    message: error,
                    severity: 'error',
                    autoHideDuration: 3000
                  })
                })
            })
            .catch((error: string) => {
              console.log('hier 1')
              addSnackbar({
                message: error,
                severity: 'error',
                autoHideDuration: 3000
              })
            })
        })
        .catch((error: string) => {
          console.log('hier 2')
          addSnackbar({
            message: error,
            severity: 'error',
            autoHideDuration: 3000
          })
        })
      /*).then((result) => {
        // Handle resulting array with calculated topic progress
        console.log(result)
        setCalculatedTopicProgress(result as { a: number; b: number }[])
      })*/
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

  return {
    calculatedTopicProgress
  }
}
