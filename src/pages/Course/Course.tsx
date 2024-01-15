import { Button, Card, CardContent, Typography, Box, Stack } from '@common/components'
import { AuthContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonList, useLearningPathTopic } from '@components'

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
                  <Typography variant="body1">{topic.lms_id}</Typography>
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
                </CardContent>
              </Card>
            )
          })}
        </>
      )}
    </Stack>
  )
}

export default Course
