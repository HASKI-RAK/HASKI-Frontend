import { Button, Card, CardContent, Typography, Box, Grid } from '@common/components'
import { AuthContext, SnackbarContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonList, useLearningPathTopic } from '@components'
import { usePersistedStore, useStore } from '@store'
import { CheckBox } from '@common/icons'
import { LinearProgressWithLabel as _linearProgressWithLabel, LinearProgressWithLabelReturn } from '@components'
import { useTheme, useMediaQuery } from '@common/hooks'

/*
  * @typedef CourseProps
  * @property {function} [LinearProgressWithLabel] - The LinearProgressWithLabel function.
  * @property {function} [LinearProgressWithLabel.calculateTopicProgress] - The calculateTopicProgress function.
  * @property {function} [LinearProgressWithLabel.BorderLinearProgress] - The BorderLinearProgress function.
 */
export type CourseProps = {
  LinearProgressWithLabel?: () => LinearProgressWithLabelReturn
}

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
const Course = ({ LinearProgressWithLabel = _linearProgressWithLabel }: CourseProps): JSX.Element => {
  const { t } = useTranslation()
  const theme = useTheme()
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }
  const { addSnackbar } = useContext(SnackbarContext)
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))

  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])
  const { loading, topics } = useLearningPathTopic(courseId)
  const { calculateTopicProgress, BorderLinearProgress } = LinearProgressWithLabel()

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)

    if (authContext.isAuth) {
      clearTimeout(preventEndlessLoading)
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
                      return allDoneLearningElements.some(
                        (status) => status.cmid === learningElement.learning_element.lms_id
                      )
                    })
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
      ).then((result) => {
        // Handle resulting array with calculated topic progress
        setCalculatedTopicProgress(result)
      })
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [authContext.isAuth, courseId, navigate, topics, getUser, getLearningPathElement, getLearningPathElementStatus])

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
          {topics.map((topic, index) => {
            return (
              <Card
                key={topic.id}
                sx={{ width: { xs: '10rem', sm: '20rem', md: '40rem', lg: '50rem', xl: '70rem' }, mt: '1rem' }}>
                <CardContent>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item md={1}>
                      {/*if topic is done 100%, a checkbox is displayed*/}
                      {calculatedTopicProgress[index] &&
                        calculatedTopicProgress[index][0] / calculatedTopicProgress[index][1] == 1 && (
                          <CheckBox
                            sx={{
                              mt: '-0.8rem',
                              ml: { xs: '7rem', sm: '17rem', md: '37rem', lg: '47rem', xl: '67rem' },
                              fontSize: 29
                            }}
                            color={'success'}
                          />
                        )}
                    </Grid>
                    <Grid item md={11}>
                      <Typography variant={isSmOrDown ? 'subtitle1' : 'h5'}>{topic.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item direction="column" justifyContent="center" alignItems="center">
                    <Button
                      id={topic.name.concat('-button').replaceAll(' ', '-')}
                      sx={{
                        width: { xs: '6.625rem', sm: '9.625rem', md: '12.625rem', lg: '15.625rem', xl: '18.625rem' },
                        mt: '1.625rem'
                      }}
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
                {/* Display topic progress bar */}
                <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
                  {calculatedTopicProgress[index] ? (
                    calculateTopicProgress(calculatedTopicProgress, index)
                  ) : (
                    // Display loading state if progress is not available yet
                    <BorderLinearProgress
                      value={10}
                      text={'loading...'}
                      color={'info'}
                      textposition={{ xs: '20rem', sm: '5rem', md: '15rem', lg: '25rem', xl: '45rem' }}
                    />
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
