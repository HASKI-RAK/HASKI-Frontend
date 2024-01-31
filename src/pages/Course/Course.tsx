import { Button, Card, CardContent, Typography, Box, Grid } from '@common/components'
import { AuthContext, SnackbarContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonList, useLearningPathTopic } from '@components'
import { usePersistedStore, useStore } from '@store'
import { CheckBox } from '@common/icons'
import { useCourse as _useCourse, CourseHookReturn } from './Course.hooks'

export type CourseProps = {
  useCourse?: () => CourseHookReturn
}

/**
 * # Course Page
 * Presents an overview of the course.
 * @remarks
 * Uses the {@link useLearningPathTopic} hook to get the topics of the course.
 * @category Pages
 */
const Course = ({ useCourse = _useCourse }: CourseProps): JSX.Element => {
  const { t } = useTranslation()
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }
  const { addSnackbar } = useContext(SnackbarContext)

  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])
  const { loading, topics } = useLearningPathTopic(courseId)
  const { calculateTopicProgress, BorderLinearProgress } = useCourse()

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (authContext.isAuth) {
      clearTimeout(preventEndlessLoading)
      const calculatedTopicProgressArray: number[][] = []
      Promise.all(
        topics.map((topic) => {
          return getUser().then((user) => {
            return getLearningPathElementStatus(courseId, user.lms_user_id)
              .then((learningPathElementStatusData) => {
                //filter all learning elements with state 1 (done)
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
                    //filter all learning elements in topic for done learning elements
                    const allDoneLearningElementsInTopic = allLearningElementsInTopic.path.map((learningElement) => {
                      //returns true if at least one element of the array is a match
                      return allDoneLearningElements.some(
                        (status) => status.cmid === learningElement.learning_element.lms_id
                      )
                    })
                    //build a array[][] with the number of done learning elements and the number of all learning elements in topic
                    //do that for every topic, and lastly return an array with all the arrays for every topic
                    //example: [[1,2],[2,2],[0,2]]
                    return [
                      ...calculatedTopicProgressArray,
                      [
                        allDoneLearningElementsInTopic.filter((stateDone) => stateDone).length,
                        allLearningElementsInTopic.path.length
                      ]
                    ]
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
          })
        })
      )
        .then((result) => {
          // Handle resulting array with calculated topic progress
          setCalculatedTopicProgress(result.flat())
        })
        .catch((error) => {
          log.error(error)
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
  }, [authContext.isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

  return (
    <>
      {loading ? (
        <Box sx={{ flewGrow: 1 }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs zeroMinWidth>
              <Box sx={{ width: '30rem' }}>
                <SkeletonList />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {topics.map((topic, index) => {
            return (
              <Card key={topic.id} sx={{ width: '50rem', mt: '1rem' }}>
                <CardContent>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item md={1}>
                      {calculatedTopicProgress[index] &&
                        calculatedTopicProgress[index][0] / calculatedTopicProgress[index][1] == 1 && (
                          <CheckBox sx={{ mt: '-0.8rem', ml: '47rem', fontSize: 29 }} color={'success'} />
                        )}
                    </Grid>
                    <Grid item md={11}>
                      <Typography variant="h5">{topic.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item direction="column" justifyContent="center" alignItems="center">
                    <Button
                      id={topic.name.concat('-button').replaceAll(' ', '-')}
                      sx={{ width: '15.625rem', mt: '1.625rem' }}
                      variant="contained"
                      data-testid={'Course-Card-Topic-' + topic.name}
                      color="primary"
                      onClick={() => {
                        navigate('topic/' + topic.id)
                      }}>
                      {t('pages.course.topicButton')}
                    </Button>
                  </Grid>
                </CardContent>
                <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
                  {calculatedTopicProgress[index] ? (
                    calculateTopicProgress(calculatedTopicProgress, index)
                  ) : (
                    <BorderLinearProgress value={10} text={'loading...'} color={'info'} textposition={'29rem'} />
                  )}
                </Grid>
              </Card>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default Course
