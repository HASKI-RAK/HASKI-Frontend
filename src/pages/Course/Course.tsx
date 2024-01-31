import { Button, Card, CardContent, Typography, Box, Grid, Tooltip } from '@common/components'
import { AuthContext, SnackbarContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonList, useLearningPathTopic } from '@components'
import { LearningPathLearningElement } from '@core'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import { styled } from '@common/theme'
import { linearProgressClasses } from '@mui/material'
import { usePersistedStore, useStore } from '@store'
import { CheckBox } from '@common/icons'

/*
Another possibility to show the progress of the course in a circle

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number } & { text: string},
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
        >{`${(props.text)}`}</Typography>
      </Box>
    </Box>
  )
}
*/

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number } & { text: string } & { textPosition: string}) => {
  return (
    <div>
      <Tooltip title={"Completed learning elements"}>
      <Typography sx={{ ml: props.textPosition, mr: '0.5rem' }} variant="body1" color="text.secondary">
        {'Learning progress: ' + props.text}
      </Typography>
      </Tooltip>
      <LinearProgress variant="determinate" {...props} sx={{ml: '-4rem'}} />
    </div>
  )
}

const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3
  }
}))

const calculateTopicProgress = (learningElementProgressTopics: number[][], index: number) => {
  return(
  <BorderLinearProgress
    value={
      (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100 > 1
        ? (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100
        : 6
    }
    text={learningElementProgressTopics[index][0] + '/' + learningElementProgressTopics[index][1]}
    color={
      (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100 == 0
        ? 'error'
        : (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100 > 70
          ? 'success'
          : 'warning'
    }
    textPosition={'34rem'}
  />
  )
}

/**
 * # Course Page
 * Presents an overview of the course.
 * @remarks
 * Uses the {@link useLearningPathTopic} hook to get the topics of the course.
 * @category Pages
 */
const Course = () => {
  const { t } = useTranslation()
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }
  const { addSnackbar } = useContext(SnackbarContext)

  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)

  const [learningElementStatusInTopic] = useState<
    Array<LearningPathLearningElement[]>
  >([])
  const [calculatedTopicProgress, setCalculatedTopicProgress] = useState<number[][]>([[]])
  const [loadingTopicProgress, setLoadingTopicProgress] = useState<boolean>(false)
  const { loading, topics } = useLearningPathTopic(courseId)

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
                const onlyDone = learningPathElementStatusData.filter((learningPathElementStatus) => {
                  return learningPathElementStatus.state === 1
                })
                return getLearningPathElement(
                  user.settings.user_id,
                  user.lms_user_id,
                  user.id,
                  courseId,
                  topic.id.toString()
                )
                  .then((learningPathElementData) => {
                    return learningElementStatusInTopic.concat([learningPathElementData.path])
                  })
                  .then((resultArray) => {
                    const smth = resultArray[0].map((learningElement) => {
                      if (onlyDone.find((status) => status.cmid === learningElement.learning_element.lms_id)) {
                        return true
                      } else {
                        return false
                      }
                    })

                    return [
                      ...calculatedTopicProgressArray,
                      ...resultArray.map((result) => [
                        smth.filter((stateDone) => {
                          return stateDone
                        }).length,
                        result.length
                      ])
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
          // Handle results
          const flattenedResult: number[][] = result.flat()
          setCalculatedTopicProgress(flattenedResult)
          setLoadingTopicProgress(true)
        })
        .catch((error) => {
          log.error(error)
        })
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [
    authContext.isAuth,
    courseId,
    navigate,
    topics,
    getUser,
    getLearningPathElement,
    getLearningPathElementStatus,
    learningElementStatusInTopic
  ])

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
                      {calculatedTopicProgress[index] && (
                        (calculatedTopicProgress[index][0] / calculatedTopicProgress[index][1]) == 1 &&
                          <CheckBox sx={{ mt: '-0.8rem',ml: '47rem', fontSize: 29,}} color={"success"}/>
                      )}
                      </Grid>
                      <Grid item md={11}>
                      <Typography variant="h5">
                        {topic.name}
                      </Typography>
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
                    loadingTopicProgress ? (
                      calculateTopicProgress(calculatedTopicProgress, index)
                    ) : (
                      <BorderLinearProgress value={10} text={'loading...'} color={'info'} textPosition={'29rem'}/>
                    )
                  ) : (
                    <BorderLinearProgress value={10} text={'loading...'} color={'info'} textPosition={'29rem'}/>
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
