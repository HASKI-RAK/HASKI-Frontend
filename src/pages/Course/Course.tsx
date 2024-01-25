import { Button, Card, CardContent, Typography, Box, Grid, Divider } from '@common/components'
import { AuthContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonList, useLearningPathTopic } from '@components'
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
  );
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

  const { loading, topics } = useLearningPathTopic(courseId)

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 1000)
    if (authContext.isAuth) {
      clearTimeout(preventEndlessLoading)
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [])

  return (
    <>
      {loading ? (
        <Box sx={{flewGrow: 1}}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid item xs zeroMinWidth>
              <Box sx={{width: '30rem'}}>
                <SkeletonList />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {topics.map((topic) => {
              return (
                <Card key={topic.id} sx={{width: '40rem', mt:'1rem'}}>
                  <CardContent>
                    <Grid container item
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center">
                      <Grid container item md={8}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center">
                        <Grid container item md={11}
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center">
                          <Typography variant="h5">{topic.name}</Typography>
                        </Grid>
                        <Grid container item
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center">
                          <Button
                            id={topic.name.concat('-button').replaceAll(' ', '-')}
                            sx={{ width: '15.625rem'}}
                            variant="contained"
                            data-testid={'Course-Card-Topic-' + topic.name}
                            color="primary"
                            onClick={() => {
                              navigate('topic/' + topic.id)
                            }}>
                            {t('pages.course.topicButton')}
                          </Button>
                        </Grid>
                      </Grid>
                      <Divider orientation="vertical" variant="fullWidth" flexItem sx={{mr:'2rem'}}/>
                      <Grid container item md={3}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center">
                        <CircularProgressWithLabel value={100} text={"10/10"} size={100} thickness={3}/>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )
            })}
          </Grid>
        </>
      )}
    </>
  )
}

export default Course
