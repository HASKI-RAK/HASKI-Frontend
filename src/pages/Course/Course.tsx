import { Button, Card, CardContent, Typography, Box, Stack } from '@common/components'
import { AuthContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonList, useLearningPathTopic } from '@components'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

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
          component="div"
          color="text.secondary"
        >{`${(props.text)}`}</Typography>
      </Box>
    </Box>
  );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number } & { text: string}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '20%', mr: 1 }}>
        <LinearProgress sx={{ml: 2}} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${(
          props.text
        )}`}</Typography>
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
    <Stack spacing={2} sx={{ ml: '1rem', mr: '1rem' }}>
      {loading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <>
          {topics.map((topic) => {
            return (
              <Card key={topic.id}>
                <CardContent>
                  <Typography variant="h5">{topic.name}</Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    id={topic.name.concat('-button').replaceAll(' ', '-')}
                    variant="contained"
                    data-testid={'Course-Card-Topic-' + topic.name}
                    color="primary"
                    onClick={() => {
                      navigate('topic/' + topic.id)
                    }}>
                    {t('pages.course.topicButton')}
                  </Button>

                  </Stack>
                </CardContent>
                <LinearProgressWithLabel value={80} text={"6/10"} />
              </Card>
            )
          })}
        </>
      )}
    </Stack>
  )
}

export default Course
