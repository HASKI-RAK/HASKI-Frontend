import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Grid } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { SkeletonList, useLearningPathTopic } from '@components'
import { LearningPathElementStatus, LearningPathLearningElement } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import Content from './Content'
import { useCourse } from './Course.hooks'

const filterAllDoneLearningElementsInTopic = (
  learningPath: LearningPathLearningElement[],
  allDoneLearningElements: LearningPathElementStatus[]
) =>
  learningPath.map((learningElement) =>
    allDoneLearningElements.some((status) => status.cmid === learningElement.learning_element.lms_id)
  )

/**
 * # Course Page
 * Presents an overview of the course.
 * @param props - The props object should be empty.
 * @returns A JSX Element with the rendered course page.
 * @remarks
 * Uses the {@link useLearningPathTopic} hook to get the topics of the course.
 * Uses the {@link LinearProgressWithLabel} hook to calculate the progress of each topic in the course.
 * @category Pages
 */
const Course = () => {
  const theme = useTheme()
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }
  const { addSnackbar } = useContext(SnackbarContext)
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))

  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])
  const { loading, topics } = useLearningPathTopic(courseId)
  // const { calculatedTopicProgress } = useCourse()

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (isAuth) {
      clearTimeout(preventEndlessLoading)

      getUser().then(async (user) => {
        Promise.all(
          await getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
            .then((topics) => {
              return topics.topics.map((topic) => {
                return getLearningPathElementStatus(courseId, user.lms_user_id)
                  .then((learningPathElementStatusData) => {
                    return getLearningPathElement(
                      user.settings.user_id,
                      user.lms_user_id,
                      user.id,
                      courseId,
                      topic.id.toString()
                    )
                      .then((allLearningElementsInTopic) => {
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
                        return [
                          allDoneLearningElementsInTopic.filter((stateDone) => stateDone).length,
                          allLearningElementsInTopic.path.length
                        ]
                      })
                      .catch((error: string) => {
                        addSnackbar({
                          message: error,
                          severity: 'error',
                          autoHideDuration: 3000
                        })
                        return [] as number[]
                      })
                  })
                  .catch((error: string) => {
                    addSnackbar({
                      message: error,
                      severity: 'error',
                      autoHideDuration: 3000
                    })
                    return [] as number[]
                  })
              })
            })
            .catch((error: string) => {
              addSnackbar({
                message: error,
                severity: 'error',
                autoHideDuration: 3000
              })
              return [] as number[]
            })
        ).then((result) => {
          // Handle resulting array with calculated topic progress
          setCalculatedTopicProgress(result)
        })
      })
    }
    /**
      ).then((result) => {
        // Handle resulting array with calculated topic progress
        setCalculatedTopicProgress(result)
      }) */

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

  return (
    <>
      {loading ? (
        //display skeleton list while loading
        <Box sx={{ flewGrow: 1 }}>
          <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ ml: '3rem' }}>
            <Grid item xs zeroMinWidth>
              <Box sx={{ width: '30rem' }}>
                <SkeletonList />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        //display topics once data is loaded
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ ml: '3rem' }}>
          {topics.map((topic, index) => (
            <Content
              key={''}
              topic={topic}
              calculatedTopicProgress={calculatedTopicProgress}
              index={index}
              isSmOrDown={isSmOrDown}
            />
          ))}
        </Grid>
      )}
    </>
  )
}

export default Course
